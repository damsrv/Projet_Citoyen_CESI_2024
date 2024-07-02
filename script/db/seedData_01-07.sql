--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3 (Ubuntu 16.3-1.pgdg20.04+1)

-- Started on 2024-07-01 13:38:32 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3489 (class 0 OID 196632)
-- Dependencies: 219
-- Data for Name: CategoryType; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."CategoryType" VALUES (1, 'PROFESSIONNEL');
INSERT INTO public."CategoryType" VALUES (2, 'AIDE');
INSERT INTO public."CategoryType" VALUES (3, 'PARTAGE COMPETENCES');


--
-- TOC entry 3487 (class 0 OID 196623)
-- Dependencies: 217
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Category" VALUES (1, ' Orientation professionnelle', 1);
INSERT INTO public."Category" VALUES (2, 'Création d''entreprise', 1);
INSERT INTO public."Category" VALUES (3, 'Accompagnement et soutien recherche formation/stage/alternance', 1);
INSERT INTO public."Category" VALUES (4, 'Autres', 1);
INSERT INTO public."Category" VALUES (5, 'Démarches administratives
', 2);
INSERT INTO public."Category" VALUES (6, ' Soutien scolaire', 2);
INSERT INTO public."Category" VALUES (7, 'Informatique', 3);
INSERT INTO public."Category" VALUES (8, 'Artisanat', 3);
INSERT INTO public."Category" VALUES (9, 'Marketing', 3);
INSERT INTO public."Category" VALUES (10, 'Cuisine', 3);
INSERT INTO public."Category" VALUES (11, 'Arts', 3);


--
-- TOC entry 3511 (class 0 OID 196749)
-- Dependencies: 241
-- Data for Name: ComType; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."ComType" VALUES (5, 'Visio');
INSERT INTO public."ComType" VALUES (4, 'Téléphone');
INSERT INTO public."ComType" VALUES (3, 'Messagerie');
INSERT INTO public."ComType" VALUES (2, 'Email');
INSERT INTO public."ComType" VALUES (1, 'Personne');


--
-- TOC entry 3503 (class 0 OID 196707)
-- Dependencies: 233
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Role" VALUES (1, 'ADMIN');
INSERT INTO public."Role" VALUES (2, 'USER');


--
-- TOC entry 3510 (class 0 OID 196741)
-- Dependencies: 240
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."User" VALUES (20, 'Henri', 'COCHET', 'h-cochet@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', NULL, 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" VALUES (19, 'Jean', 'MOULIN', 'j-moulin@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', '/uploads/avatar/moulin-1719491855663-233142046.jpeg', 1, 'une description de mentor ...', '2024-06-25 00:00:00', 'Cuisine traditionnelle
Cuisine africaine
Cuisine normande à la créme fraiche', 2, '2024-06-25 09:36:17.984');
INSERT INTO public."User" VALUES (21, 'Jacques', 'COUCHE', 'jacouche@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description ...', '1990-11-08 00:00:00', NULL, 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" VALUES (1, 'Jean-Jacques', 'GOLDMAN', 'jjg@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', 'Gestion de projet
Leadership
Communication efficace', 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" VALUES (9, 'Jean-Claude', 'VAN DAMME', 'jcvd@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', 'Développement web
Base de données
Sécurité informatique', 2, '2024-05-25 16:29:20.964');
INSERT INTO public."User" VALUES (22, 'Damien', 'COTE', 'dcote@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, NULL, '1990-11-08 00:00:00', NULL, 1, '2024-05-23 11:44:09.735');
INSERT INTO public."User" VALUES (17, 'Jean-Francois', 'COPE', 'jaimelargent@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', '/uploads/avatar/bb37318462c90131d1db4da0e68399dc-1719304201662-459386511.png', 1, 'une description de mentor ...', '2024-06-02 00:00:00', 'Marketing digital
SEO/SEA
Analyse de données', 2, '2024-06-02 12:35:48.57');
INSERT INTO public."User" VALUES (18, 'Jean', 'DUJARDIN', 'j-dujardin@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-06-23 10:36:17.45', 'Intelligence artificielle
Apprentissage automatique
Traitement du langage naturel', 2, '1990-06-23 10:36:17.451');
INSERT INTO public."User" VALUES (28, 'test', 'test', 'tesjfdsd@ui.fr', '$2b$10$85iKlA4IRuoPZnB4yDm.dujVm27nrUJbjA5ePlHxUP4qEHjE15kb2', NULL, 1, NULL, '2024-06-28 08:04:34.981', NULL, 2, '2024-06-28 08:04:36.126');
INSERT INTO public."User" VALUES (29, 'Alexis', 'Petit', 'contact@alexis-petit.fr', '$2b$10$DaRZ3IPN46Af0M0o.a0VTuTXxQq0rx0OL9gCn1W8fHUzgvfZcyB0.', NULL, 1, NULL, '2024-06-28 08:36:49.708', NULL, 2, '2024-06-28 08:36:50.839');
INSERT INTO public."User" VALUES (30, 'Jean', 'Tallut', 'j-tallut@test.fr', '$2b$10$QJ1kEkgcKfCF2F8N/sUr.OUe5GrgEBOxPy6nKGZ4Kwm/bd9id2oNO', NULL, 1, NULL, '2024-06-28 08:36:56.724', NULL, 2, '2024-06-28 08:36:56.725');


--
-- TOC entry 3491 (class 0 OID 196641)
-- Dependencies: 221
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Evaluation" VALUES (1, '2024-06-26 12:06:31.106', 20, 1, 3, 'Pas terrible ....');
INSERT INTO public."Evaluation" VALUES (3, '2024-06-26 12:08:22.537', 20, 18, 1, 'Nul !!!');
INSERT INTO public."Evaluation" VALUES (4, '2024-06-26 12:08:22.537', 21, 19, 5, 'Très bon !');
INSERT INTO public."Evaluation" VALUES (5, '2024-06-26 12:09:57.412', 21, 9, 2, 'Vraiment nul !');
INSERT INTO public."Evaluation" VALUES (6, '2024-06-26 12:09:57.412', 21, 17, 5, 'Très très bien !');


--
-- TOC entry 3496 (class 0 OID 196669)
-- Dependencies: 226
-- Data for Name: Offer; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Offer" VALUES (7, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 2, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" VALUES (5, '2024-05-22 00:00:00', 'Mentorat idéal pour commencer la couture ! Le crochet vous fait peur ? N''ayez craint je le pratique depuis 40 ans et tous mes petits enfant n''ont jamais eu à acheter de chaussettes !', 'Rambouillet', 1, 19, 'Apprendre la couture avec Jean;', 8);
INSERT INTO public."Offer" VALUES (6, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peut mais je serais la pour vous guider si vous le souhaitez.', 'Versaille', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" VALUES (1, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" VALUES (8, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" VALUES (9, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" VALUES (2, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" VALUES (3, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" VALUES (4, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" VALUES (12, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Anger', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" VALUES (16, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" VALUES (18, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.', 'Versailles', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" VALUES (19, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 1, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" VALUES (20, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" VALUES (21, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" VALUES (22, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" VALUES (23, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" VALUES (24, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" VALUES (25, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands-parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" VALUES (26, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Angers', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" VALUES (27, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" VALUES (28, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.', 'Versailles', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" VALUES (29, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 1, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" VALUES (30, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" VALUES (31, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" VALUES (32, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" VALUES (33, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" VALUES (34, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" VALUES (35, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands-parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" VALUES (36, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Angers', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" VALUES (37, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" VALUES (43, '2024-06-28 08:38:55.051', 'Je vais vous apprendre à faire du covering sur votre voiture. Je vous propose des rencontres dans mon garage avec bière et saucisson dans la bonne humeur.', 'Rouen', 1, 30, 'Comment tuner sa voiture avec du covering. ', 8);


--
-- TOC entry 3505 (class 0 OID 196716)
-- Dependencies: 235
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Room" VALUES (6, '2024-06-26 13:41:25.109', 'New room', 12);
INSERT INTO public."Room" VALUES (7, '2024-06-27 13:33:40.143', 'Apprendre la couture avec Jean;', 5);
INSERT INTO public."Room" VALUES (8, '2024-06-28 08:41:25.749', 'Comment tuner sa voiture avec du covering. ', 43);


--
-- TOC entry 3493 (class 0 OID 196651)
-- Dependencies: 223
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Message" VALUES (4, '2024-06-26 13:54:38.967', 6, 20, 'Bonjour Mr MOULIN j''aimerais discuter avec vous.', 0);
INSERT INTO public."Message" VALUES (5, '2024-06-26 13:54:38.967', 6, 19, 'Oui bien sur allons y parlons cuisine.', 0);
INSERT INTO public."Message" VALUES (6, '2024-06-26 13:56:10.35', 6, 20, 'Je vous explique ma femme adore la crème fraiche mais je ne sais pas cuisiner avec ... :( :( :( :( ', 0);
INSERT INTO public."Message" VALUES (7, '2024-06-26 13:56:49.67', 6, 19, 'Vous irez plus vite à changer de femme car cuisiner à la crème ne s''apprend pas comme ca.', 0);
INSERT INTO public."Message" VALUES (8, '2024-06-27 12:30:51.322', 6, 19, 'Si vous voulez divorcer je connais un très bon avocat ...', 0);
INSERT INTO public."Message" VALUES (9, '2024-06-27 13:35:56.13', 7, 9, 'Wesh', 0);
INSERT INTO public."Message" VALUES (10, '2024-06-27 13:35:23.383', 7, 19, 'Désolé je ne parles pas allemand', 0);
INSERT INTO public."Message" VALUES (11, '2024-06-28 08:42:09.485', 8, 19, 'Bonjour', 0);
INSERT INTO public."Message" VALUES (12, '2024-06-28 08:42:17.406', 8, 30, 'Bonjour', 0);


--
-- TOC entry 3516 (class 0 OID 230560)
-- Dependencies: 246
-- Data for Name: OfferComType; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."OfferComType" VALUES (12, 3);
INSERT INTO public."OfferComType" VALUES (12, 4);
INSERT INTO public."OfferComType" VALUES (16, 2);
INSERT INTO public."OfferComType" VALUES (16, 3);
INSERT INTO public."OfferComType" VALUES (43, 1);


--
-- TOC entry 3494 (class 0 OID 196660)
-- Dependencies: 224
-- Data for Name: OfferStudent; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."OfferStudent" VALUES (21, '2024-06-23 11:31:46.758', 2, 'Bonjour, je voudrais échanger avec vous', 2);
INSERT INTO public."OfferStudent" VALUES (21, '2024-06-23 11:32:13.265', 16, 'Bonjour, je voudrais échanger avec vous', 2);
INSERT INTO public."OfferStudent" VALUES (20, '2024-06-23 10:37:05.548', 12, 'Bonjour, je voudrais échanger avec vous', 1);
INSERT INTO public."OfferStudent" VALUES (19, '2024-06-27 12:18:30.507', 25, 'salut jean ca va ? ca jardinne ?', 0);
INSERT INTO public."OfferStudent" VALUES (9, '2024-06-27 13:33:37.137', 5, 'Wesh, je veux apprendre la couture Jean stp', 1);
INSERT INTO public."OfferStudent" VALUES (9, '2024-06-27 13:36:53.589', 12, 'Mais si stp', 2);
INSERT INTO public."OfferStudent" VALUES (29, '2024-06-28 08:40:31.548', 43, 'Bonjour, oui', 0);
INSERT INTO public."OfferStudent" VALUES (19, '2024-06-28 08:40:34.583', 43, 'J''aimerais en apprendre un peu plus', 1);


--
-- TOC entry 3498 (class 0 OID 196679)
-- Dependencies: 228
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: default
--



--
-- TOC entry 3501 (class 0 OID 196697)
-- Dependencies: 231
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: default
--



--
-- TOC entry 3499 (class 0 OID 196688)
-- Dependencies: 229
-- Data for Name: RequestMentor; Type: TABLE DATA; Schema: public; Owner: default
--



--
-- TOC entry 3506 (class 0 OID 196725)
-- Dependencies: 236
-- Data for Name: SavedOffer; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."SavedOffer" VALUES (17, 4);
INSERT INTO public."SavedOffer" VALUES (20, 6);
INSERT INTO public."SavedOffer" VALUES (19, 43);


--
-- TOC entry 3507 (class 0 OID 196730)
-- Dependencies: 237
-- Data for Name: SavedRequest; Type: TABLE DATA; Schema: public; Owner: default
--



--
-- TOC entry 3513 (class 0 OID 196761)
-- Dependencies: 243
-- Data for Name: Skill; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."Skill" VALUES (1, 'Informatique');
INSERT INTO public."Skill" VALUES (4, 'Artisanat');
INSERT INTO public."Skill" VALUES (5, 'Poterie');


--
-- TOC entry 3512 (class 0 OID 196756)
-- Dependencies: 242
-- Data for Name: SkillCategory; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."SkillCategory" VALUES (5, 8);
INSERT INTO public."SkillCategory" VALUES (4, 8);
INSERT INTO public."SkillCategory" VALUES (1, 7);


--
-- TOC entry 3508 (class 0 OID 196735)
-- Dependencies: 238
-- Data for Name: UserRoom; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public."UserRoom" VALUES (20, 6);
INSERT INTO public."UserRoom" VALUES (19, 6);
INSERT INTO public."UserRoom" VALUES (19, 7);
INSERT INTO public."UserRoom" VALUES (9, 7);
INSERT INTO public."UserRoom" VALUES (30, 8);
INSERT INTO public."UserRoom" VALUES (19, 8);


--
-- TOC entry 3514 (class 0 OID 196773)
-- Dependencies: 244
-- Data for Name: UserSkill; Type: TABLE DATA; Schema: public; Owner: default
--



--
-- TOC entry 3485 (class 0 OID 196611)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: default
--

INSERT INTO public._prisma_migrations VALUES ('6a4061ee-67a7-4d0e-a1a7-f4c5da7b72ab', '7a4c5192fbbce45d75104a1dc980a0379a00903cd6e87958fefd5242efd25908', '2024-05-23 11:00:41.104492+00', '20240523110040_initial_migration', NULL, NULL, '2024-05-23 11:00:40.576715+00', 1);
INSERT INTO public._prisma_migrations VALUES ('bf987753-7a7e-456d-868d-8f4a327d18e8', 'fae0d8791e9b600a9851af8baac5f6acd114ca9eb83b23f85b9a6505dcdd289c', '2024-05-23 11:44:08.34157+00', '20240523114407_ajout_register_at_in_user', NULL, NULL, '2024-05-23 11:44:07.944421+00', 1);
INSERT INTO public._prisma_migrations VALUES ('44f15dc1-0bd8-4a6b-9e1f-b7070f99d886', '0da6399cd85b9a61151e11f8bfd62b09008cad5ecab00514ec4025d8ebf805cd', '2024-05-24 10:24:10.838593+00', '20240524102410_modification_id_skill', NULL, NULL, '2024-05-24 10:24:10.740438+00', 1);
INSERT INTO public._prisma_migrations VALUES ('427f74f0-3447-431c-b2de-af6b5bfc4c4a', '5d5ada1990b5f3bcf93d93fc8f2786fcbc1cf1c54d7203b11f08bb884ee959e9', '2024-05-24 14:23:09.087797+00', '20240524142308_suppression_lien_comptype_to_user_and_added_it_to_offer', NULL, NULL, '2024-05-24 14:23:08.964001+00', 1);
INSERT INTO public._prisma_migrations VALUES ('2c4f25c5-f12e-466c-96c0-c4393414eccf', 'fe57f42fd2b106d8267652a1008b48995e2ea838d99dea2b7519be46013e79b8', '2024-06-22 12:40:05.794688+00', '20240622124005_add_status_to_reports', NULL, NULL, '2024-06-22 12:40:05.70843+00', 1);
INSERT INTO public._prisma_migrations VALUES ('48129082-a2fa-4ffb-b028-15c0c0d474f1', '2d706090e3c92d1735bfb0ed4e4d07b8ce815825445b8658eb9162a3d64111d7', '2024-06-24 09:37:38.917187+00', '20240624093738_ajout', NULL, NULL, '2024-06-24 09:37:38.508024+00', 1);
INSERT INTO public._prisma_migrations VALUES ('98f1664d-fe39-4564-8ede-6310c993db61', '51bb90d8815d739efdc539651b136ef57c3645b8ae65372aefac015962ca8797', '2024-06-24 09:39:58.026754+00', '20240624093955_ajout', NULL, NULL, '2024-06-24 09:39:57.432826+00', 1);
INSERT INTO public._prisma_migrations VALUES ('da702665-bc8d-4daa-99e7-ec91e4cca94c', '26d057ee6df9a6faa5acebb91cbfede69e5c7b0c047f1609a7f8c861533ea080', '2024-06-28 07:32:54.30689+00', '20240628073253_fix_autoincrement', NULL, NULL, '2024-06-28 07:32:53.96372+00', 1);


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 218
-- Name: CategoryType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."CategoryType_id_seq"', 1, false);


--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 216
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, true);


--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 220
-- Name: Evaluation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Evaluation_id_seq"', 6, true);


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 222
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Message_id_seq"', 12, true);


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 225
-- Name: Offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Offer_id_seq"', 43, true);


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 227
-- Name: Report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Report_id_seq"', 1, false);


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 230
-- Name: Request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Request_id_seq"', 1, false);


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 232
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Role_id_seq"', 1, false);


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 234
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Room_id_seq"', 8, true);


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 239
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."User_id_seq"', 30, true);


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 247
-- Name: comtype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.comtype_id_seq', 1, false);


--
-- TOC entry 3534 (class 0 OID 0)
-- Dependencies: 245
-- Name: skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.skill_id_seq', 5, true);


-- Completed on 2024-07-01 13:38:35 CEST

--
-- PostgreSQL database dump complete
--

