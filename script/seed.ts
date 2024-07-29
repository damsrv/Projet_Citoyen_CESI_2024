const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'USER' },
    ],
  });


  await prisma.categoryType.createMany({
    data: [
      { id: 1, name: 'PROFESSIONNEL' },
      { id: 2, name: 'AIDE' },
      { id: 3, name: 'PARTAGE COMPETENCES' },
    ],
  });

  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Orientation professionnelle', categoryTypeId: 1 },
      { id: 2, name: 'Création d\'entreprise', categoryTypeId: 1 },
      { id: 3, name: 'Accompagnement et soutien recherche formation/stage/alternance', categoryTypeId: 1 },
      { id: 4, name: 'Autres', categoryTypeId: 1 },
      { id: 5, name: 'Démarches administratives', categoryTypeId: 2 },
      { id: 6, name: 'Soutien scolaire', categoryTypeId: 2 },
      { id: 7, name: 'Informatique', categoryTypeId: 3 },
      { id: 8, name: 'Artisanat', categoryTypeId: 3 },
      { id: 9, name: 'Marketing', categoryTypeId: 3 },
      { id: 10, name: 'Cuisine', categoryTypeId: 3 },
      { id: 11, name: 'Arts', categoryTypeId: 3 },
    ],
  });

  await prisma.comType.createMany({
    data: [
      { id: 5, name: 'Visio' },
      { id: 4, name: 'Téléphone' },
      { id: 3, name: 'Messagerie' },
      { id: 2, name: 'Email' },
      { id: 1, name: 'Personne' },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        id: 20,
        firstname: 'Henri',
        lastname: 'COCHET',
        email: 'h-cochet@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        experiences: null,
        roleId: 2,
        registerAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 19,
        firstname: 'Jean',
        lastname: 'MOULIN',
        email: 'j-moulin@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: '/uploads/avatar/moulin-1719491855663-233142046.jpeg',
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '2024-06-25T00:00:00.000Z',
        experiences: 'Cuisine traditionnelle\nCuisine africaine\nCuisine normande à la créme fraiche',
        roleId: 2,
        registerAt: '2024-06-25T09:36:17.984Z'
      },
      {
        id: 21,
        firstname: 'Jacques',
        lastname: 'COUCHE',
        email: 'jacouche@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: 'une description ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        experiences: null,
        roleId: 2,
        registerAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 1,
        firstname: 'Jean-Jacques',
        lastname: 'GOLDMAN',
        email: 'jjg@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        experiences: 'Gestion de projet\nLeadership\nCommunication efficace',
        roleId: 2,
        registerAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 9,
        firstname: 'Jean-Claude',
        lastname: 'VAN DAMME',
        email: 'jcvd@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        experiences: 'Développement web\nBase de données\nSécurité informatique',
        roleId: 2,
        registerAt: '2024-05-25T16:29:20.964Z'
      },
      {
        id: 22,
        firstname: 'Damien',
        lastname: 'COTE',
        email: 'dcote@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: null,
        birthdate: '1990-11-08T00:00:00.000Z',
        experiences: null,
        roleId: 1,
        registerAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 17,
        firstname: 'Jean-Francois',
        lastname: 'COPE',
        email: 'jaimelargent@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: '/uploads/avatar/bb37318462c90131d1db4da0e68399dc-1719304201662-459386511.png',
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '2024-06-02T00:00:00.000Z',
        experiences: 'Marketing digital\nSEO/SEA\nAnalyse de données',
        roleId: 2,
        registerAt: '2024-06-02T12:35:48.570Z'
      },
      {
        id: 18,
        firstname: 'Jean',
        lastname: 'DUJARDIN',
        email: 'j-dujardin@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        status: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-06-23T10:36:17.450Z',
        experiences: 'Intelligence artificielle\nApprentissage automatique\nTraitement du langage naturel',
        roleId: 2,
        registerAt: '1990-06-23T10:36:17.451Z'
      },
      {
        id: 28,
        firstname: 'test',
        lastname: 'test',
        email: 'tesjfdsd@ui.fr',
        password: '$2b$10$85iKlA4IRuoPZnB4yDm.dujVm27nrUJbjA5ePlHxUP4qEHjE15kb2',
        avatar: null,
        status: 1,
        description: null,
        birthdate: '2024-06-28T08:04:34.981Z',
        experiences: null,
        roleId: 2,
        registerAt: '2024-06-28T08:04:36.126Z'
      },
      {
        id: 29,
        firstname: 'Alexis',
        lastname: 'Petit',
        email: 'contact@alexis-petit.fr',
        password: '$2b$10$DaRZ3IPN46Af0M0o.a0VTuTXxQq0rx0OL9gCn1W8fHUzgvfZcyB0.',
        avatar: null,
        status: 1,
        description: null,
        birthdate: '2024-06-28T08:36:49.708Z',
        experiences: null,
        roleId: 2,
        registerAt: '2024-06-28T08:36:50.839Z'
      },
      {
        id: 30,
        firstname: 'Jean',
        lastname: 'Tallut',
        email: 'j-tallut@test.fr',
        password: '$2b$10$QJ1kEkgcKfCF2F8N/sUr.OUe5GrgEBOxPy6nKGZ4Kwm/bd9id2oNO',
        avatar: null,
        status: 1,
        description: null,
        birthdate: '2024-06-28T08:36:56.724Z',
        experiences: null,
        roleId: 2,
        registerAt: '2024-06-28T08:36:56.725Z'
      }
    ],
  });

  await prisma.evaluation.createMany({
    data: [
      {
        id: 1,
        createdAt: '2024-06-26T12:06:31.106Z',
        studentId: 20,
        mentorId: 1,
        value: 3,
        comment: 'Pas terrible ....'
      },
      {
        id: 3,
        createdAt: '2024-06-26T12:08:22.537Z',
        studentId: 20,
        mentorId: 18,
        value: 1,
        comment: 'Nul !!!'
      },
      {
        id: 4,
        createdAt: '2024-06-26T12:08:22.537Z',
        studentId: 21,
        mentorId: 19,
        value: 5,
        comment: 'Très bon !'
      },
      {
        id: 5,
        createdAt: '2024-06-26T12:09:57.412Z',
        studentId: 21,
        mentorId: 9,
        value: 2,
        comment: 'Vraiment nul !'
      },
      {
        id: 6,
        createdAt: '2024-06-26T12:09:57.412Z',
        studentId: 21,
        mentorId: 17,
        value: 5,
        comment: 'Très très bien !'
      }
    ],
  });

  await prisma.offer.createMany({
    data: [
      {
        id: 7,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        status: 2,
        mentorId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryId: 11
      },
      {
        id: 5,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Mentorat idéal pour commencer la couture ! Le crochet vous fait peur ? N\'ayez crainte, je le pratique depuis 40 ans et tous mes petits enfants n\'ont jamais eu à acheter de chaussettes !',
        location: 'Rambouillet',
        status: 1,
        mentorId: 19,
        title: 'Apprendre la couture avec Jean',
        categoryId: 8
      },
      {
        id: 6,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serai là pour vous guider si vous le souhaitez.',
        location: 'Versailles',
        status: 1,
        mentorId: 1,
        title: 'Aide à la création d\'entreprise',
        categoryId: 2
      },
      {
        id: 1,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        status: 1,
        mentorId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryId: 9
      },
      {
        id: 8,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryId: 11
      },
      {
        id: 9,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        status: 1,
        mentorId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryId: 11
      },
      {
        id: 2,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Développement web front-end et back-end, base de données et sécurité.',
        location: 'Lyon',
        status: 1,
        mentorId: 9,
        title: 'Mentorat en Développement Web',
        categoryId: 7
      }, {
        id: 3,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Stratégies de marketing digital, SEO/SEA et analyse de données.',
        location: 'Marseille',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Marketing Digital',
        categoryId: 9
      }, {
        id: 4,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands parents.',
        location: 'Rouen',
        status: 1,
        mentorId: 18,
        title: 'Atelier Potterie en ligne et en direct.',
        categoryId: 8
      }, {
        id: 12,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.',
        location: 'Anger',
        status: 1,
        mentorId: 19,
        title: 'Mentorat en Cuisine Française',
        categoryId: 10
      }, {
        id: 16,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.',
        location: 'Strasbourg',
        status: 2,
        mentorId: 1,
        title: 'Mentorat en Démarches Administratives',
        categoryId: 5
      }, {
        id: 18,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.',
        location: 'Versailles',
        status: 1,
        mentorId: 1,
        title: 'Aide à la création d\'entreprise.',
        categoryId: 2
      },
      {
        id: 19,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        status: 1,
        mentorId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryId: 11,
      },
      {
        id: 20,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        status: 1,
        mentorId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryId: 9,
      },
      {
        id: 21,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryId: 11,
      },
      {
        id: 22,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        status: 1,
        mentorId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryId: 11,
      },
      {
        id: 23,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Développement web front-end et back-end, base de données et sécurité.',
        location: 'Lyon',
        status: 1,
        mentorId: 9,
        title: 'Mentorat en Développement Web',
        categoryId: 7,
      },
      {
        id: 24,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Stratégies de marketing digital, SEO/SEA et analyse de données.',
        location: 'Marseille',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Marketing Digital',
        categoryId: 9,
      },
      {
        id: 25,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands-parents.',
        location: 'Rouen',
        status: 1,
        mentorId: 18,
        title: 'Atelier Potterie en ligne et en direct.',
        categoryId: 8,
      },
      {
        id: 26,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.',
        location: 'Angers',
        status: 1,
        mentorId: 19,
        title: 'Mentorat en Cuisine Française',
        categoryId: 10,
      },
      {
        id: 27,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.',
        location: 'Strasbourg',
        status: 2,
        mentorId: 1,
        title: 'Mentorat en Démarches Administratives',
        categoryId: 5,
      },
      {
        id: 28,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.',
        location: 'Versailles',
        status: 1,
        mentorId: 1,
        title: 'Aide à la création d\'entreprise.',
        categoryId: 2,
      },
      {
        id: 29,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        status: 1,
        mentorId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryId: 11,
      },
      {
        id: 30,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        status: 1,
        mentorId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryId: 9,
      },
      {
        id: 31,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryId: 11,
      },
      {
        id: 32,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        status: 1,
        mentorId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryId: 11,
      },
      {
        id: 33,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Développement web front-end et back-end, base de données et sécurité.',
        location: 'Lyon',
        status: 1,
        mentorId: 9,
        title: 'Mentorat en Développement Web',
        categoryId: 7,
      },
      {
        id: 34,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Stratégies de marketing digital, SEO/SEA et analyse de données.',
        location: 'Marseille',
        status: 1,
        mentorId: 17,
        title: 'Mentorat en Marketing Digital',
        categoryId: 9,
      },
      {
        id: 35,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands-parents.',
        location: 'Rouen',
        status: 1,
        mentorId: 18,
        title: 'Atelier Potterie en ligne et en direct.',
        categoryId: 8,
      },
      {
        id: 36,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.',
        location: 'Angers',
        status: 1,
        mentorId: 19,
        title: 'Mentorat en Cuisine Française',
        categoryId: 10,
      },
      {
        id: 37,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.',
        location: 'Strasbourg',
        status: 2,
        mentorId: 1,
        title: 'Mentorat en Démarches Administratives',
        categoryId: 5,
      },
      {
        id: 43,
        createdAt: '2024-06-26T12:06:31.106Z',
        content: 'Je vais vous apprendre à faire du covering sur votre voiture. Je vous propose des rencontres dans mon garage avec bière et saucisson dans la bonne humeur.',
        location: 'Rouen',
        status: 1,
        mentorId: 30,
        title: 'Comment tuner sa voiture avec du covering.',
        categoryId: 8,
      },
    ],
  });

  await prisma.room.createMany({
    data: [
      {
        id: 6,
        createdAt: '2024-06-26T13:41:25.109Z',
        name: 'New room',
        offerId: 12
      },
      {
        id: 7,
        createdAt: '2024-06-27T13:33:40.143Z',
        name: 'Apprendre la couture avec Jean',
        offerId: 5
      },
      {
        id: 8,
        createdAt: '2024-06-28T08:41:25.749Z',
        name: 'Comment tuner sa voiture avec du covering',
        offerId: 43
      }
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        id: 4,
        sentAt: '2024-06-26T13:54:38.967Z',
        roomId: 6,
        senderId: 20,
        content: 'Bonjour Mr MOULIN j\'aimerais discuter avec vous.',
        status: 0
      },
      {
        id: 5,
        sentAt: '2024-06-26T13:54:38.967Z',
        roomId: 6,
        senderId: 19,
        content: 'Oui bien sûr allons-y parlons cuisine.',
        status: 0
      },
      {
        id: 6,
        sentAt: '2024-06-26T13:56:10.350Z',
        roomId: 6,
        senderId: 20,
        content: 'Je vous explique, ma femme adore la crème fraîche mais je ne sais pas cuisiner avec ... :( :( :( :(',
        status: 0
      },
      {
        id: 7,
        sentAt: '2024-06-26T13:56:49.670Z',
        roomId: 6,
        senderId: 19,
        content: 'Vous irez plus vite à changer de femme car cuisiner à la crème ne s\'apprend pas comme ça.',
        status: 0
      },
      {
        id: 8,
        sentAt: '2024-06-27T12:30:51.322Z',
        roomId: 6,
        senderId: 19,
        content: 'Si vous voulez divorcer je connais un très bon avocat ...',
        status: 0
      },
      {
        id: 9,
        sentAt: '2024-06-27T13:35:56.130Z',
        roomId: 7,
        senderId: 9,
        content: 'Wesh',
        status: 0
      },
      {
        id: 10,
        sentAt: '2024-06-27T13:35:23.383Z',
        roomId: 7,
        senderId: 19,
        content: 'Désolé je ne parle pas allemand',
        status: 0
      },
      {
        id: 11,
        sentAt: '2024-06-28T08:42:09.485Z',
        roomId: 8,
        senderId: 19,
        content: 'Bonjour',
        status: 0
      },
      {
        id: 12,
        sentAt: '2024-06-28T08:42:17.406Z',
        roomId: 8,
        senderId: 30,
        content: 'Bonjour',
        status: 0
      },
  
    ],
  });


  await prisma.offerComType.createMany({
    data: [
      { offerId: 12, comTypeId: 3 },
      { offerId: 12, comTypeId: 4 },
      { offerId: 16, comTypeId: 2 },
      { offerId: 16, comTypeId: 3 },
      { offerId: 43, comTypeId: 1 },
    ],
  });

  await prisma.offerStudent.createMany({
    data: [
      {
        studentId: 21,
        date: '2024-06-23T11:31:46.758Z',
        offerId: 2,
        message: 'Bonjour, je voudrais échanger avec vous',
        status: 2
      },
      {
        studentId: 21,
        date: '2024-06-23T11:32:13.265Z',
        offerId: 16,
        message: 'Bonjour, je voudrais échanger avec vous',
        status: 2
      },
      {
        studentId: 20,
        date: '2024-06-23T10:37:05.548Z',
        offerId: 12,
        message: 'Bonjour, je voudrais échanger avec vous',
        status: 1
      },
      {
        studentId: 19,
        date: '2024-06-27T12:18:30.507Z',
        offerId: 25,
        message: 'salut jean ca va ? ca jardinne ?',
        status: 0
      },
      {
        studentId: 9,
        date: '2024-06-27T13:33:37.137Z',
        offerId: 5,
        message: 'Wesh, je veux apprendre la couture Jean stp',
        status: 1
      },
      {
        studentId: 9,
        date: '2024-06-27T13:36:53.589Z',
        offerId: 12,
        message: 'Mais si stp',
        status: 2
      },
      {
        studentId: 29,
        date: '2024-06-28T08:40:31.548Z',
        offerId: 43,
        message: 'Bonjour, oui',
        status: 0
      },
      {
        studentId: 19,
        date: '2024-06-28T08:40:34.583Z',
        offerId: 43,
        message: 'J\'aimerais en apprendre un peu plus',
        status: 1
      }
    ],
  });

  await prisma.savedOffer.createMany({
    data: [
      { offerId: 4, userId: 17 },
      { offerId: 6, userId: 20 },
      { offerId: 43, userId: 19 },
    ],
    // Ignorer les erreurs de duplication si les enregistrements existent déjà
    skipDuplicates: true,
  });

  await prisma.skill.createMany({
    data: [
      { id: 1, name: 'Informatique' },
      { id: 4, name: 'Artisanat' },
      { id: 5, name: 'Poterie' },
    ],
    // Ignorer les erreurs de duplication si les enregistrements existent déjà
    skipDuplicates: true,
  });

  await prisma.skillCategory.createMany({
    data: [
      { skillId: 5, categoryId: 8 },
      { skillId: 4, categoryId: 8 },
      { skillId: 1, categoryId: 7 },
    ],
    // Ignorer les erreurs de duplication si les enregistrements existent déjà
    skipDuplicates: true,
  });

  await prisma.userRoom.createMany({
    data: [
      { userId: 20, roomId: 6 },
      { userId: 19, roomId: 6 },
      { userId: 19, roomId: 7 },
      { userId: 9, roomId: 7 },
      { userId: 30, roomId: 8 },
      { userId: 19, roomId: 8 },
    ],
    // Ignorer les erreurs de duplication si les enregistrements existent déjà
    skipDuplicates: true,
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });