# Portfolio Sabrine - Projet DevOps POC

Ce projet démontre une chaîne DevOps complète avec CI/CD, Infrastructure as Code, et GitOps.

## Architecture

```
┌─────────────────┐
│  GitHub Actions │─── CI/CD Pipeline
└────────┬────────┘
         │
         ├──> Build & Test
         ├──> Docker Image (1.0.0-RC1)
         └──> Release (1.0.0)
                  │
                  ▼
         ┌─────────────────┐
         │   Docker Hub    │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  Terraform AWS  │─── 3 EC2 Instances
         └────────┬────────┘
                  │
                  ├──> Master Node (kubeadm)
                  └──> 2 Worker Nodes
                           │
                           ▼
                  ┌─────────────────┐
                  │  Kubernetes     │
                  │  Cluster v1.34  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Argo CD      │─── GitOps
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  K8s Manifests  │
                  │  (Git Repo)     │
                  └─────────────────┘
```

## Phase 1 : CI/CD avec GitHub Actions

### Prérequis

1. Créer un compte Docker Hub
2. Créer un token d'accès Docker Hub
3. Configurer les secrets GitHub :
   - `DOCKERHUB_USERNAME` : ton nom d'utilisateur Docker Hub
   - `DOCKERHUB_TOKEN` : ton token Docker Hub

### Workflows

- **`.github/workflows/ci.yml`** : Déclenché sur Pull Request vers `main`
  - Build de l'application
  - Exécution des tests unitaires (bloquants)
  - Build et push de l'image Docker avec tag `1.0.0-RC1`

- **`.github/workflows/release-approve.yml`** : Déclenché au merge d'une PR vers `main`
  - Récupère l'image `1.0.0-RC1`
  - Retag en `1.0.0`
  - Push de l'image stable
  - Création du tag Git `v1.0.0`

## Phase 2 : Infrastructure AWS avec Terraform

### Prérequis

1. Installer Terraform : https://www.terraform.io/downloads
2. Configurer AWS CLI avec tes credentials
3. Créer une clé SSH dans AWS EC2

### Déploiement

```bash
cd terraform

# Initialiser Terraform
terraform init

# Créer terraform.tfvars avec tes valeurs
cp terraform.tfvars.example terraform.tfvars
# Éditer terraform.tfvars avec ta clé SSH

# Planifier les ressources
terraform plan

# Appliquer
terraform apply
```

### Outputs

Après `terraform apply`, tu obtiendras :
- IP publique du master
- IPs publiques des workers
- IPs privées pour la communication interne

## Phase 3 : Installation Kubernetes

### Sur le Master Node

```bash
# Se connecter au master
ssh -i your-key.pem ubuntu@MASTER_IP

# Vérifier que kubeadm init s'est bien exécuté
kubectl get nodes

# Récupérer la commande de join pour les workers
cat /home/ubuntu/k8s-join/join-command.sh
```

### Sur les Worker Nodes

```bash
# Se connecter à chaque worker
ssh -i your-key.pem ubuntu@WORKER_IP

# Exécuter la commande kubeadm join (copiée depuis le master)
sudo kubeadm join <MASTER_IP>:6443 --token <TOKEN> --discovery-token-ca-cert-hash sha256:<HASH>
```

### Validation

```bash
# Depuis le master
kubectl get nodes
# Tous les nœuds doivent être en état Ready
```

## Phase 4 : GitOps avec Argo CD

### Installation d'Argo CD

```bash
# Depuis le master node
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Attendre que les pods soient prêts
kubectl wait --for=condition=ready pod --all -n argocd --timeout=300s

# Récupérer le mot de passe admin
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port-forward pour accéder à l'UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Accéder à Argo CD : https://localhost:8080 (utilisateur: `admin`)

### Configuration GitOps

1. **Créer un dépôt Git séparé pour les manifests Kubernetes**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-sabrine-k8s-manifests.git
   cd portfolio-sabrine-k8s-manifests
   # Copier les fichiers de kubernetes-manifests/
   git add .
   git commit -m "Initial K8s manifests"
   git push origin main
   ```

2. **Modifier `deployment.yaml`** : Remplacer `YOUR_DOCKERHUB_USERNAME` par ton username Docker Hub

3. **Créer l'Application Argo CD**
   ```bash
   kubectl apply -f argocd/application.yaml
   ```

4. **Vérifier le déploiement**
   ```bash
   kubectl get applications -n argocd
   kubectl get pods -n examen-26
   ```

### Configuration DNS avec DuckDNS

1. Créer un compte sur https://www.duckdns.org
2. Créer un sous-domaine (ex: `sabrine-portfolio.duckdns.org`)
3. Installer l'Ingress Controller NGINX :
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
   ```

4. Récupérer l'IP publique du master node
5. Configurer DuckDNS pour pointer vers cette IP
6. Modifier `ingress.yaml` avec ton domaine DuckDNS
7. Appliquer via Argo CD (auto-sync activé)

## Structure du Projet

```
portfolio-sabrine/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI Pipeline
│       └── release-approve.yml    # Release Promotion
├── terraform/
│   ├── main.tf                    # Infrastructure AWS
│   ├── variables.tf
│   ├── terraform.tfvars.example
│   └── scripts/
│       ├── master-init.sh         # Script installation master
│       └── worker-init.sh          # Script installation worker
├── kubernetes-manifests/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── argocd/
│   └── application.yaml           # Argo CD Application
├── Dockerfile
├── nginx.conf
└── README-DEVOPS.md
```

## Commandes Utiles

### Docker
```bash
# Build local
docker build -t portfolio-sabrine:local .

# Test local
docker run -p 8080:80 portfolio-sabrine:local
```

### Kubernetes
```bash
# Vérifier les nœuds
kubectl get nodes

# Vérifier les pods
kubectl get pods -n examen-26

# Logs
kubectl logs -f deployment/portfolio-sabrine -n examen-26

# Port-forward pour tester
kubectl port-forward svc/portfolio-sabrine-service -n examen-26 8080:80
```

### Argo CD
```bash
# Lister les applications
argocd app list

# Synchroniser manuellement
argocd app sync portfolio-sabrine

# Voir le statut
argocd app get portfolio-sabrine
```

## Notes Importantes

- ⚠️ **Secrets** : Ne jamais commiter de secrets dans Git. Utiliser GitHub Secrets.
- 🔒 **Sécurité** : Les Security Groups AWS sont ouverts pour le POC. En production, restreindre les accès.
- 💰 **Coûts** : Les instances EC2 génèrent des coûts. Penser à les détruire après le test :
  ```bash
  cd terraform
  terraform destroy
  ```
- 📝 **Documentation** : Tous les fichiers sont commentés pour faciliter la compréhension.

## Support

Pour toute question, consulter :
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Argo CD Documentation](https://argo-cd.readthedocs.io/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

