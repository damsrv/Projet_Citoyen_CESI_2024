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
        firstName: 'Henri',
        lastName: 'COCHET',
        email: 'h-cochet@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        specialties: null,
        comTypeId: 2,
        createdAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 19,
        firstName: 'Jean',
        lastName: 'MOULIN',
        email: 'j-moulin@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: '/uploads/avatar/moulin-1719491855663-233142046.jpeg',
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '2024-06-25T00:00:00.000Z',
        specialties: 'Cuisine traditionnelle\nCuisine africaine\nCuisine normande à la créme fraiche',
        comTypeId: 2,
        createdAt: '2024-06-25T09:36:17.984Z'
      },
      {
        id: 21,
        firstName: 'Jacques',
        lastName: 'COUCHE',
        email: 'jacouche@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: 'une description ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        specialties: null,
        comTypeId: 2,
        createdAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 1,
        firstName: 'Jean-Jacques',
        lastName: 'GOLDMAN',
        email: 'jjg@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        specialties: 'Gestion de projet\nLeadership\nCommunication efficace',
        comTypeId: 2,
        createdAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 9,
        firstName: 'Jean-Claude',
        lastName: 'VAN DAMME',
        email: 'jcvd@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-11-08T00:00:00.000Z',
        specialties: 'Développement web\nBase de données\nSécurité informatique',
        comTypeId: 2,
        createdAt: '2024-05-25T16:29:20.964Z'
      },
      {
        id: 22,
        firstName: 'Damien',
        lastName: 'COTE',
        email: 'dcote@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: null,
        birthdate: '1990-11-08T00:00:00.000Z',
        specialties: null,
        comTypeId: 1,
        createdAt: '2024-05-23T11:44:09.735Z'
      },
      {
        id: 17,
        firstName: 'Jean-Francois',
        lastName: 'COPE',
        email: 'jaimelargent@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: '/uploads/avatar/bb37318462c90131d1db4da0e68399dc-1719304201662-459386511.png',
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '2024-06-02T00:00:00.000Z',
        specialties: 'Marketing digital\nSEO/SEA\nAnalyse de données',
        comTypeId: 2,
        createdAt: '2024-06-02T12:35:48.570Z'
      },
      {
        id: 18,
        firstName: 'Jean',
        lastName: 'DUJARDIN',
        email: 'j-dujardin@test.fr',
        password: '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy',
        avatar: null,
        roleId: 1,
        description: 'une description de mentor ...',
        birthdate: '1990-06-23T10:36:17.450Z',
        specialties: 'Intelligence artificielle\nApprentissage automatique\nTraitement du langage naturel',
        comTypeId: 2,
        createdAt: '1990-06-23T10:36:17.451Z'
      },
      {
        id: 28,
        firstName: 'test',
        lastName: 'test',
        email: 'tesjfdsd@ui.fr',
        password: '$2b$10$85iKlA4IRuoPZnB4yDm.dujVm27nrUJbjA5ePlHxUP4qEHjE15kb2',
        avatar: null,
        roleId: 1,
        description: null,
        birthdate: '2024-06-28T08:04:34.981Z',
        specialties: null,
        comTypeId: 2,
        createdAt: '2024-06-28T08:04:36.126Z'
      },
      {
        id: 29,
        firstName: 'Alexis',
        lastName: 'Petit',
        email: 'contact@alexis-petit.fr',
        password: '$2b$10$DaRZ3IPN46Af0M0o.a0VTuTXxQq0rx0OL9gCn1W8fHUzgvfZcyB0.',
        avatar: null,
        roleId: 1,
        description: null,
        birthdate: '2024-06-28T08:36:49.708Z',
        specialties: null,
        comTypeId: 2,
        createdAt: '2024-06-28T08:36:50.839Z'
      },
      {
        id: 30,
        firstName: 'Jean',
        lastName: 'Tallut',
        email: 'j-tallut@test.fr',
        password: '$2b$10$QJ1kEkgcKfCF2F8N/sUr.OUe5GrgEBOxPy6nKGZ4Kwm/bd9id2oNO',
        avatar: null,
        roleId: 1,
        description: null,
        birthdate: '2024-06-28T08:36:56.724Z',
        specialties: null,
        comTypeId: 2,
        createdAt: '2024-06-28T08:36:56.725Z'
      }
    ],
  });

  await prisma.evaluation.createMany({
    data: [
      {
        id: 1,
        createdAt: '2024-06-26T12:06:31.106Z',
        mentorId: 20,
        menteeId: 1,
        rating: 3,
        comment: 'Pas terrible ....'
      },
      {
        id: 3,
        createdAt: '2024-06-26T12:08:22.537Z',
        mentorId: 20,
        menteeId: 18,
        rating: 1,
        comment: 'Nul !!!'
      },
      {
        id: 4,
        createdAt: '2024-06-26T12:08:22.537Z',
        mentorId: 21,
        menteeId: 19,
        rating: 5,
        comment: 'Très bon !'
      },
      {
        id: 5,
        createdAt: '2024-06-26T12:09:57.412Z',
        mentorId: 21,
        menteeId: 9,
        rating: 2,
        comment: 'Vraiment nul !'
      },
      {
        id: 6,
        createdAt: '2024-06-26T12:09:57.412Z',
        mentorId: 21,
        menteeId: 17,
        rating: 5,
        comment: 'Très très bien !'
      }
    ],
  });

  await prisma.offer.createMany({
    data: [
      {
        id: 7,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        comTypeId: 2,
        mentorId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryTypeId: 11
      },
      {
        id: 5,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Mentorat idéal pour commencer la couture ! Le crochet vous fait peur ? N\'ayez crainte, je le pratique depuis 40 ans et tous mes petits enfants n\'ont jamais eu à acheter de chaussettes !',
        location: 'Rambouillet',
        comTypeId: 1,
        mentorId: 19,
        title: 'Apprendre la couture avec Jean',
        categoryTypeId: 8
      },
      {
        id: 6,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serai là pour vous guider si vous le souhaitez.',
        location: 'Versailles',
        comTypeId: 1,
        mentorId: 1,
        title: 'Aide à la création d\'entreprise',
        categoryTypeId: 2
      },
      {
        id: 1,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        comTypeId: 1,
        mentorId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryTypeId: 9
      },
      {
        id: 8,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        comTypeId: 1,
        mentorId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryTypeId: 11
      },
      {
        id: 9,
        startDate: '2024-05-22T00:00:00.000Z',
        description: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        comTypeId: 1,
        mentorId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryTypeId: 11
      },
      { id: 2, createdAt: '2024-05-22 00:00:00', description: 'Développement web front-end et back-end, base de données et sécurité.', location: 'Lyon', status: 1, userId: 9, title: 'Mentorat en Développement Web', categoryTypeId: 7 },
      { id: 3, createdAt: '2024-05-22 00:00:00', description: 'Stratégies de marketing digital, SEO/SEA et analyse de données.', location: 'Marseille', status: 1, userId: 17, title: 'Mentorat en Marketing Digital', categoryTypeId: 9 },
      { id: 4, createdAt: '2024-05-22 00:00:00', description: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands parents.', location: 'Rouen', status: 1, userId: 18, title: 'Atelier Potterie en ligne et en direct.', categoryTypeId: 8 },
      { id: 12, createdAt: '2024-06-08 13:51:18.452', description: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', location: 'Anger', status: 1, userId: 19, title: 'Mentorat en Cuisine Française', categoryTypeId: 10 },
      { id: 16, createdAt: '2024-06-22 13:34:50.757', description: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', location: 'Strasbourg', status: 2, userId: 1, title: 'Mentorat en Démarches Administratives', categoryTypeId: 5 },
      { id: 18, createdAt: '2024-05-22 00:00:00', description: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.', location: 'Versailles', status: 1, userId: 1, title: 'Aide à la création d\'entreprise.', categoryTypeId: 2 },
      {
        id: 19,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        status: 1,
        userId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryTypeId: 11,
      },
      {
        id: 20,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        status: 1,
        userId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryTypeId: 9,
      },
      {
        id: 21,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        status: 1,
        userId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryTypeId: 11,
      },
      {
        id: 22,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        status: 1,
        userId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryTypeId: 11,
      },
      {
        id: 23,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Développement web front-end et back-end, base de données et sécurité.',
        location: 'Lyon',
        status: 1,
        userId: 9,
        title: 'Mentorat en Développement Web',
        categoryTypeId: 7,
      },
      {
        id: 24,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Stratégies de marketing digital, SEO/SEA et analyse de données.',
        location: 'Marseille',
        status: 1,
        userId: 17,
        title: 'Mentorat en Marketing Digital',
        categoryTypeId: 9,
      },
      {
        id: 25,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands-parents.',
        location: 'Rouen',
        status: 1,
        userId: 18,
        title: 'Atelier Potterie en ligne et en direct.',
        categoryTypeId: 8,
      },
      {
        id: 26,
        createdAt: new Date('2024-06-08T13:51:18.452Z'),
        description: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.',
        location: 'Angers',
        status: 1,
        userId: 19,
        title: 'Mentorat en Cuisine Française',
        categoryTypeId: 10,
      },
      {
        id: 27,
        createdAt: new Date('2024-06-22T13:34:50.757Z'),
        description: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.',
        location: 'Strasbourg',
        status: 2,
        userId: 1,
        title: 'Mentorat en Démarches Administratives',
        categoryTypeId: 5,
      },
      {
        id: 28,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Je souhaite vous guider dans votre création d\'entreprise. La création d\'entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.',
        location: 'Versailles',
        status: 1,
        userId: 1,
        title: 'Aide à la création d\'entreprise.',
        categoryTypeId: 2,
      },
      {
        id: 29,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Cours de peinture à l\'huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.',
        location: 'Toulouse',
        status: 1,
        userId: 9,
        title: 'Mentorat en Peinture à l\'Huile',
        categoryTypeId: 11,
      },
      {
        id: 30,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.',
        location: 'Paris',
        status: 1,
        userId: 1,
        title: 'Mentorat en Gestion de Projet',
        categoryTypeId: 9,
      },
      {
        id: 31,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.',
        location: 'Brest',
        status: 1,
        userId: 17,
        title: 'Mentorat en Sculpture sur Bois',
        categoryTypeId: 11,
      },
      {
        id: 32,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.',
        location: 'Dijon',
        status: 1,
        userId: 18,
        title: 'Mentorat en Photographie Artistique',
        categoryTypeId: 11,
      },
      {
        id: 33,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Développement web front-end et back-end, base de données et sécurité.',
        location: 'Lyon',
        status: 1,
        userId: 9,
        title: 'Mentorat en Développement Web',
        categoryTypeId: 7,
      },
      {
        id: 34,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Stratégies de marketing digital, SEO/SEA et analyse de données.',
        location: 'Marseille',
        status: 1,
        userId: 17,
        title: 'Mentorat en Marketing Digital',
        categoryTypeId: 9,
      },
      {
        id: 35,
        createdAt: new Date('2024-05-22T00:00:00Z'),
        description: 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l\'ai apprise de mes grands-parents.',
        location: 'Rouen',
        status: 1,
        userId: 18,
        title: 'Atelier Potterie en ligne et en direct.',
        categoryTypeId: 8,
      },
      {
        id: 36,
        createdAt: new Date('2024-06-08T13:51:18.452Z'),
        description: 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.',
        location: 'Angers',
        status: 1,
        userId: 19,
        title: 'Mentorat en Cuisine Française',
        categoryTypeId: 10,
      },
      {
        id: 37,
        createdAt: new Date('2024-06-22T13:34:50.757Z'),
        description: 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.',
        location: 'Strasbourg',
        status: 2,
        userId: 1,
        title: 'Mentorat en Démarches Administratives',
        categoryTypeId: 5,
      },
      {
        id: 43,
        createdAt: new Date('2024-06-28T08:38:55.051Z'),
        description: 'Je vais vous apprendre à faire du covering sur votre voiture. Je vous propose des rencontres dans mon garage avec bière et saucisson dans la bonne humeur.',
        location: 'Rouen',
        status: 1,
        userId: 30,
        title: 'Comment tuner sa voiture avec du covering.',
        categoryTypeId: 8,
      },
    ],
  });

  await prisma.room.createMany({
    data: [
      {
        id: 6,
        createdAt: '2024-06-26T13:41:25.109Z',
        name: 'New room',
        ownerId: 12
      },
      {
        id: 7,
        createdAt: '2024-06-27T13:33:40.143Z',
        name: 'Apprendre la couture avec Jean',
        ownerId: 5
      },
      {
        id: 8,
        createdAt: '2024-06-28T08:41:25.749Z',
        name: 'Comment tuner sa voiture avec du covering',
        ownerId: 43
      }
    ],
  });

  await prisma.message.createMany({
    data: [
      {
        id: 4,
        createdAt: '2024-06-26T13:54:38.967Z',
        roomId: 6,
        senderId: 20,
        content: 'Bonjour Mr MOULIN j\'aimerais discuter avec vous.',
        type: 0
      },
      {
        id: 5,
        createdAt: '2024-06-26T13:54:38.967Z',
        roomId: 6,
        senderId: 19,
        content: 'Oui bien sûr allons-y parlons cuisine.',
        type: 0
      },
      {
        id: 6,
        createdAt: '2024-06-26T13:56:10.350Z',
        roomId: 6,
        senderId: 20,
        content: 'Je vous explique, ma femme adore la crème fraîche mais je ne sais pas cuisiner avec ... :( :( :( :(',
        type: 0
      },
      {
        id: 7,
        createdAt: '2024-06-26T13:56:49.670Z',
        roomId: 6,
        senderId: 19,
        content: 'Vous irez plus vite à changer de femme car cuisiner à la crème ne s\'apprend pas comme ça.',
        type: 0
      },
      {
        id: 8,
        createdAt: '2024-06-27T12:30:51.322Z',
        roomId: 6,
        senderId: 19,
        content: 'Si vous voulez divorcer je connais un très bon avocat ...',
        type: 0
      },
      {
        id: 9,
        createdAt: '2024-06-27T13:35:56.130Z',
        roomId: 7,
        senderId: 9,
        content: 'Wesh',
        type: 0
      },
      {
        id: 10,
        createdAt: '2024-06-27T13:35:23.383Z',
        roomId: 7,
        senderId: 19,
        content: 'Désolé je ne parle pas allemand',
        type: 0
      },
      {
        id: 11,
        createdAt: '2024-06-28T08:42:09.485Z',
        roomId: 8,
        senderId: 19,
        content: 'Bonjour',
        type: 0
      },
      {
        id: 12,
        createdAt: '2024-06-28T08:42:17.406Z',
        roomId: 8,
        senderId: 30,
        content: 'Bonjour',
        type: 0
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
        offerId: 21,
        createdAt: '2024-06-23T11:31:46.758Z',
        studentId: 2,
        content: 'Bonjour, je voudrais échanger avec vous',
        status: 2
      },
      {
        offerId: 21,
        createdAt: '2024-06-23T11:32:13.265Z',
        studentId: 16,
        content: 'Bonjour, je voudrais échanger avec vous',
        status: 2
      },
      {
        offerId: 20,
        createdAt: '2024-06-23T10:37:05.548Z',
        studentId: 12,
        content: 'Bonjour, je voudrais échanger avec vous',
        status: 1
      },
      {
        offerId: 19,
        createdAt: '2024-06-27T12:18:30.507Z',
        studentId: 25,
        content: 'salut jean ca va ? ca jardinne ?',
        status: 0
      },
      {
        offerId: 9,
        createdAt: '2024-06-27T13:33:37.137Z',
        studentId: 5,
        content: 'Wesh, je veux apprendre la couture Jean stp',
        status: 1
      },
      {
        offerId: 9,
        createdAt: '2024-06-27T13:36:53.589Z',
        studentId: 12,
        content: 'Mais si stp',
        status: 2
      },
      {
        offerId: 29,
        createdAt: '2024-06-28T08:40:31.548Z',
        studentId: 43,
        content: 'Bonjour, oui',
        status: 0
      },
      {
        offerId: 19,
        createdAt: '2024-06-28T08:40:34.583Z',
        studentId: 43,
        content: 'J\'aimerais en apprendre un peu plus',
        status: 1
      }
    ],
  });

  await prisma.savedOffer.createMany({
    data: [
      { userId: 4, offerId: 17 },
      { userId: 6, offerId: 20 },
      { userId: 43, offerId: 19 },
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
      { skillId: 5, categoryTypeId: 8 },
      { skillId: 4, categoryTypeId: 8 },
      { skillId: 1, categoryTypeId: 7 },
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