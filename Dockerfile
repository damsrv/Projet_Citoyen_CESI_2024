# Utiliser une image Node.js Alpine comme base
FROM node:22-alpine AS next

# Créer le répertoire de travail dans l'image Docker
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Next.js pour la production
RUN npm run build

COPY .next ./.next

# Exposer le port 3000 utilisé par l'application Next.js
EXPOSE 3000

# Commande de démarrage pour exécuter l'application Next.js
CMD ["npm", "run", "dev"]
