# Guide de Setup Rapide - Portfolio DevOps POC

## 🚀 Étapes de Déploiement

### Étape 1 : Configuration GitHub Actions (Phase 1 & 2)

1. **Créer un compte Docker Hub** : https://hub.docker.com
2. **Créer un Access Token** :
   - Docker Hub → Account Settings → Security → New Access Token
   - Copier le token généré
3. **Configurer les secrets GitHub** :
   - Va dans ton repo GitHub → Settings → Secrets and variables → Actions
   - Ajouter :
     - `DOCKERHUB_USERNAME` : ton username Docker Hub
     - `DOCKERHUB_TOKEN` : le token créé à l'étape 2

4. **Tester le workflow CI** :
   - Créer une branche : `git checkout -b feature/test-ci`
   - Faire un commit : `git commit -m "test CI"`
   - Push : `git push origin feature/test-ci`
   - Créer une Pull Request vers `main`
   - Le workflow se déclenchera automatiquement

### Étape 2 : Infrastructure AWS avec Terraform (Phase 3)

#### Prérequis
```bash
# Installer Terraform (Windows avec Chocolatey)
choco install terraform

# Ou télécharger depuis https://www.terraform.io/downloads
```

#### Configuration AWS
```bash
# Installer AWS CLI
# Télécharger depuis https://aws.amazon.com/cli/

# Configurer tes credentials
aws configure
# Entrer : Access Key ID, Secret Access Key, Region (ex: us-east-1)

# Créer une clé SSH dans AWS
aws ec2 create-key-pair --key-name portfolio-key --query 'KeyMaterial' --output text > portfolio-key.pem
chmod 400 portfolio-key.pem
```

#### Déploiement Terraform
```bash
cd terraform

# Initialiser
terraform init

# Créer terraform.tfvars
cat > terraform.tfvars <<EOF
aws_region = "us-east-1"
ssh_key_name = "portfolio-key"
EOF

# Vérifier le plan
terraform plan

# Appliquer (créer les ressources)
terraform apply
# Tape "yes" pour confirmer

# Noter les outputs (IPs des instances)
terraform output
```

### Étape 3 : Installation Kubernetes (Phase 3)

#### Sur le Master Node
```bash
# Se connecter au master
ssh -i ../portfolio-key.pem ubuntu@MASTER_IP

# Vérifier que l'installation est terminée
kubectl get nodes

# Si le master n'est pas Ready, attendre quelques minutes
# Vérifier les logs si nécessaire
sudo journalctl -u kubelet -f

# Récupérer la commande de join
cat /home/ubuntu/k8s-join/join-command.sh
# Copier cette commande
```

#### Sur les Workers
```bash
# Se connecter au worker 1
ssh -i ../portfolio-key.pem ubuntu@WORKER1_IP

# Exécuter la commande kubeadm join (copiée depuis le master)
sudo kubeadm join <MASTER_IP>:6443 --token <TOKEN> --discovery-token-ca-cert-hash sha256:<HASH>

# Répéter pour le worker 2
```

#### Validation
```bash
# Depuis le master
kubectl get nodes
# Tous doivent être Ready

kubectl get pods --all-namespaces
# Vérifier que tous les pods système sont Running
```

### Étape 4 : GitOps avec Argo CD (Phase 4)

#### Installation Argo CD
```bash
# Depuis le master node
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Attendre que les pods soient prêts (2-3 minutes)
kubectl wait --for=condition=ready pod --all -n argocd --timeout=300s

# Récupérer le mot de passe admin
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
# Noter ce mot de passe
```

#### Accès à l'UI Argo CD
```bash
# Port-forward depuis ton PC local
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Ouvrir https://localhost:8080
# Login : admin / Mot de passe : (celui récupéré ci-dessus)
```

#### Configuration du dépôt GitOps

1. **Créer un nouveau dépôt GitHub** : `portfolio-sabrine-k8s-manifests`
2. **Cloner et copier les manifests** :
```bash
git clone https://github.com/TON_USERNAME/portfolio-sabrine-k8s-manifests.git
cd portfolio-sabrine-k8s-manifests

# Copier les fichiers depuis kubernetes-manifests/
cp -r ../portfolio-sabrine/kubernetes-manifests/* .

# Modifier deployment.yaml : remplacer YOUR_DOCKERHUB_USERNAME
# Modifier ingress.yaml : remplacer YOUR_DOMAIN.duckdns.org

git add .
git commit -m "Initial K8s manifests"
git push origin main
```

3. **Modifier argocd/application.yaml** :
   - Remplacer `YOUR_USERNAME` par ton username GitHub
   - Appliquer :
```bash
kubectl apply -f argocd/application.yaml
```

4. **Vérifier dans Argo CD UI** :
   - L'application devrait apparaître
   - Cliquer sur "Sync" si nécessaire
   - Vérifier que tous les pods sont Running

#### Configuration DNS DuckDNS

1. **Créer un compte** : https://www.duckdns.org
2. **Créer un sous-domaine** : ex. `sabrine-portfolio.duckdns.org`
3. **Installer NGINX Ingress Controller** :
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

4. **Récupérer l'IP publique du master** :
```bash
terraform output master_public_ip
```

5. **Configurer DuckDNS** :
   - Aller sur https://www.duckdns.org
   - Mettre à jour l'IP avec celle du master
   - Ou utiliser l'API : `https://www.duckdns.org/update?domains=sabrine-portfolio&token=TON_TOKEN&ip=MASTER_IP`

6. **Mettre à jour ingress.yaml** dans le dépôt GitOps :
   - Remplacer `YOUR_DOMAIN.duckdns.org` par ton domaine
   - Commit et push
   - Argo CD synchronisera automatiquement

7. **Vérifier l'accès** :
```bash
# Depuis le master
kubectl get ingress -n examen-26

# Tester l'URL
curl http://sabrine-portfolio.duckdns.org
```

## ✅ Checklist de Validation

### Phase 1
- [ ] Workflow CI se déclenche sur PR
- [ ] Tests unitaires passent
- [ ] Image Docker `1.0.0-RC1` est créée sur Docker Hub

### Phase 2
- [ ] Workflow release se déclenche au merge
- [ ] Image `1.0.0` est créée
- [ ] Tag Git `v1.0.0` est créé

### Phase 3
- [ ] 3 instances EC2 créées via Terraform
- [ ] Master node initialisé avec kubeadm
- [ ] 2 workers joints au cluster
- [ ] `kubectl get nodes` montre 3 nœuds Ready

### Phase 4
- [ ] Argo CD installé et accessible
- [ ] Application Argo CD créée
- [ ] Pods déployés dans namespace `examen-26`
- [ ] Service accessible via NodePort
- [ ] Ingress configuré avec DuckDNS
- [ ] Application accessible via URL publique

## 🐛 Dépannage

### Les tests échouent
```bash
# Tester localement
npm test -- --watchAll=false
```

### L'image Docker ne se build pas
```bash
# Tester localement
docker build -t test .
docker run -p 8080:80 test
```

### Les workers ne rejoignent pas le cluster
```bash
# Vérifier la connectivité réseau
ping MASTER_IP

# Vérifier les ports
telnet MASTER_IP 6443

# Regénérer le token si nécessaire (depuis le master)
kubeadm token create --print-join-command
```

### Argo CD ne synchronise pas
```bash
# Vérifier les logs
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller

# Synchroniser manuellement
argocd app sync portfolio-sabrine
```

## 💰 Coûts AWS

Les instances t2.medium coûtent environ **$0.04/heure** chacune.
Pour 3 instances : **~$0.12/heure** = **~$2.88/jour**

⚠️ **Penser à détruire les ressources après le test** :
```bash
cd terraform
terraform destroy
```

## 📚 Ressources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Argo CD Documentation](https://argo-cd.readthedocs.io/)

