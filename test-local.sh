#!/bin/bash

echo "========================================"
echo "Test Local - Portfolio DevOps POC"
echo "========================================"
echo ""

echo "[1/4] Installation des dépendances..."
npm install
if [ $? -ne 0 ]; then
    echo "ERREUR: Installation des dépendances a échoué"
    exit 1
fi
echo "OK"
echo ""

echo "[2/4] Exécution des tests unitaires..."
npm test -- --watchAll=false --ci
if [ $? -ne 0 ]; then
    echo "ERREUR: Les tests ont échoué"
    exit 1
fi
echo "OK"
echo ""

echo "[3/4] Build de l'application..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERREUR: Le build a échoué"
    exit 1
fi
echo "OK"
echo ""

echo "[4/4] Build de l'image Docker..."
docker build -t portfolio-sabrine:local .
if [ $? -ne 0 ]; then
    echo "ERREUR: Le build Docker a échoué"
    echo "Vérifie que Docker Desktop est démarré"
    exit 1
fi
echo "OK"
echo ""

echo "========================================"
echo "Tous les tests sont passés avec succès!"
echo "========================================"
echo ""
echo "Pour tester l'image Docker localement:"
echo "  docker run -p 8080:80 portfolio-sabrine:local"
echo ""
echo "Puis ouvre http://localhost:8080 dans ton navigateur"
echo ""

