--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3 (Ubuntu 16.3-1.pgdg20.04+1)

-- Started on 2024-06-30 15:49:27 CEST

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
-- TOC entry 5 (class 2615 OID 196610)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA IF NOT EXISTS public



ALTER SCHEMA public OWNER TO "postgres";

-- SET postgres_tablespace = '';

-- SET postgres_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 196623)
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name character varying,
    "categoryTypeId" integer
);


ALTER TABLE public."Category" OWNER TO "postgres";

--
-- TOC entry 219 (class 1259 OID 196632)
-- Name: CategoryType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryType" (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public."CategoryType" OWNER TO "postgres";

--
-- TOC entry 218 (class 1259 OID 196631)
-- Name: CategoryType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoryType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategoryType_id_seq" OWNER TO "postgres";

--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 218
-- Name: CategoryType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoryType_id_seq" OWNED BY public."CategoryType".id;


--
-- TOC entry 216 (class 1259 OID 196622)
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO "postgres";

--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 216
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- TOC entry 241 (class 1259 OID 196749)
-- Name: ComType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComType" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."ComType" OWNER TO "postgres";

--
-- TOC entry 221 (class 1259 OID 196641)
-- Name: Evaluation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Evaluation" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    "studentId" integer NOT NULL,
    "mentorId" integer NOT NULL,
    value integer NOT NULL,
    comment text
);


ALTER TABLE public."Evaluation" OWNER TO "postgres";

--
-- TOC entry 220 (class 1259 OID 196640)
-- Name: Evaluation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Evaluation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Evaluation_id_seq" OWNER TO "postgres";

--
-- TOC entry 3550 (class 0 OID 0)
-- Dependencies: 220
-- Name: Evaluation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Evaluation_id_seq" OWNED BY public."Evaluation".id;


--
-- TOC entry 223 (class 1259 OID 196651)
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    "sentAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    "roomId" integer NOT NULL,
    "senderId" integer NOT NULL,
    content text NOT NULL,
    status integer NOT NULL
);


ALTER TABLE public."Message" OWNER TO "postgres";

--
-- TOC entry 222 (class 1259 OID 196650)
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Message_id_seq" OWNER TO "postgres";

--
-- TOC entry 3551 (class 0 OID 0)
-- Dependencies: 222
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- TOC entry 226 (class 1259 OID 196669)
-- Name: Offer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Offer" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    content text NOT NULL,
    location character varying,
    status integer NOT NULL,
    "mentorId" integer NOT NULL,
    title character varying NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."Offer" OWNER TO "postgres";

--
-- TOC entry 246 (class 1259 OID 230560)
-- Name: OfferComType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OfferComType" (
    "offerId" integer NOT NULL,
    "comTypeId" integer NOT NULL
);


ALTER TABLE public."OfferComType" OWNER TO "postgres";

--
-- TOC entry 224 (class 1259 OID 196660)
-- Name: OfferStudent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OfferStudent" (
    "studentId" integer NOT NULL,
    date timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    "offerId" integer NOT NULL,
    message text,
    status integer NOT NULL
);


ALTER TABLE public."OfferStudent" OWNER TO "postgres";

--
-- TOC entry 225 (class 1259 OID 196668)
-- Name: Offer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Offer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Offer_id_seq" OWNER TO "postgres";

--
-- TOC entry 3552 (class 0 OID 0)
-- Dependencies: 225
-- Name: Offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Offer_id_seq" OWNED BY public."Offer".id;


--
-- TOC entry 228 (class 1259 OID 196679)
-- Name: Report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Report" (
    id integer NOT NULL,
    "reporterId" integer NOT NULL,
    "targetId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    message text NOT NULL,
    reason character varying NOT NULL,
    status integer postgres 0 NOT NULL
);


ALTER TABLE public."Report" OWNER TO "postgres";

--
-- TOC entry 227 (class 1259 OID 196678)
-- Name: Report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Report_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Report_id_seq" OWNER TO "postgres";

--
-- TOC entry 3553 (class 0 OID 0)
-- Dependencies: 227
-- Name: Report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Report_id_seq" OWNED BY public."Report".id;


--
-- TOC entry 231 (class 1259 OID 196697)
-- Name: Request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Request" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    content character varying NOT NULL,
    title character varying NOT NULL,
    location character varying,
    "studentId" integer NOT NULL,
    status integer NOT NULL
);


ALTER TABLE public."Request" OWNER TO "postgres";

--
-- TOC entry 229 (class 1259 OID 196688)
-- Name: RequestMentor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RequestMentor" (
    "mentorId" integer NOT NULL,
    date timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    "requestId" integer NOT NULL,
    message text NOT NULL,
    status integer NOT NULL
);


ALTER TABLE public."RequestMentor" OWNER TO "postgres";

--
-- TOC entry 230 (class 1259 OID 196696)
-- Name: Request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Request_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Request_id_seq" OWNER TO "postgres";

--
-- TOC entry 3554 (class 0 OID 0)
-- Dependencies: 230
-- Name: Request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Request_id_seq" OWNED BY public."Request".id;


--
-- TOC entry 233 (class 1259 OID 196707)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."Role" OWNER TO "postgres";

--
-- TOC entry 232 (class 1259 OID 196706)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO "postgres";

--
-- TOC entry 3555 (class 0 OID 0)
-- Dependencies: 232
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 235 (class 1259 OID 196716)
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL,
    name character varying,
    "offerId" integer NOT NULL
);


ALTER TABLE public."Room" OWNER TO "postgres";

--
-- TOC entry 234 (class 1259 OID 196715)
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Room_id_seq" OWNER TO "postgres";

--
-- TOC entry 3556 (class 0 OID 0)
-- Dependencies: 234
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- TOC entry 236 (class 1259 OID 196725)
-- Name: SavedOffer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SavedOffer" (
    "userId" integer NOT NULL,
    "offerId" integer NOT NULL
);


ALTER TABLE public."SavedOffer" OWNER TO "postgres";

--
-- TOC entry 237 (class 1259 OID 196730)
-- Name: SavedRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SavedRequest" (
    "userId" integer NOT NULL,
    "requestId" integer NOT NULL
);


ALTER TABLE public."SavedRequest" OWNER TO "postgres";

--
-- TOC entry 243 (class 1259 OID 196761)
-- Name: Skill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Skill" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."Skill" OWNER TO "postgres";

--
-- TOC entry 242 (class 1259 OID 196756)
-- Name: SkillCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SkillCategory" (
    "skillId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."SkillCategory" OWNER TO "postgres";

--
-- TOC entry 240 (class 1259 OID 196741)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    avatar character varying,
    status integer NOT NULL,
    description text,
    birthdate timestamp(3) without time zone,
    experiences text,
    "roleId" integer NOT NULL,
    "registerAt" timestamp(3) without time zone postgres CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO "postgres";

--
-- TOC entry 238 (class 1259 OID 196735)
-- Name: UserRoom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserRoom" (
    "userId" integer NOT NULL,
    "roomId" integer NOT NULL
);


ALTER TABLE public."UserRoom" OWNER TO "postgres";

--
-- TOC entry 244 (class 1259 OID 196773)
-- Name: UserSkill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserSkill" (
    "skillId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."UserSkill" OWNER TO "postgres";

--
-- TOC entry 239 (class 1259 OID 196740)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO "postgres";

--
-- TOC entry 3557 (class 0 OID 0)
-- Dependencies: 239
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 215 (class 1259 OID 196611)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone postgres now() NOT NULL,
    applied_steps_count integer postgres 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "postgres";

--
-- TOC entry 247 (class 1259 OID 255224)
-- Name: comtype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comtype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comtype_id_seq OWNER TO "postgres";

--
-- TOC entry 3558 (class 0 OID 0)
-- Dependencies: 247
-- Name: comtype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comtype_id_seq OWNED BY public."ComType".id;


--
-- TOC entry 245 (class 1259 OID 222360)
-- Name: skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skill_id_seq OWNER TO "postgres";

--
-- TOC entry 3559 (class 0 OID 0)
-- Dependencies: 245
-- Name: skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skill_id_seq OWNED BY public."Skill".id;


--
-- TOC entry 3273 (class 2604 OID 196626)
-- Name: Category id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET postgres nextval('public."Category_id_seq"'::regclass);


--
-- TOC entry 3274 (class 2604 OID 196635)
-- Name: CategoryType id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryType" ALTER COLUMN id SET postgres nextval('public."CategoryType_id_seq"'::regclass);


--
-- TOC entry 3293 (class 2604 OID 255225)
-- Name: ComType id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComType" ALTER COLUMN id SET postgres nextval('public.comtype_id_seq'::regclass);


--
-- TOC entry 3275 (class 2604 OID 196644)
-- Name: Evaluation id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation" ALTER COLUMN id SET postgres nextval('public."Evaluation_id_seq"'::regclass);


--
-- TOC entry 3277 (class 2604 OID 196654)
-- Name: Message id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET postgres nextval('public."Message_id_seq"'::regclass);


--
-- TOC entry 3280 (class 2604 OID 196672)
-- Name: Offer id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer" ALTER COLUMN id SET postgres nextval('public."Offer_id_seq"'::regclass);


--
-- TOC entry 3282 (class 2604 OID 196682)
-- Name: Report id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Report" ALTER COLUMN id SET postgres nextval('public."Report_id_seq"'::regclass);


--
-- TOC entry 3286 (class 2604 OID 196700)
-- Name: Request id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request" ALTER COLUMN id SET postgres nextval('public."Request_id_seq"'::regclass);


--
-- TOC entry 3288 (class 2604 OID 196710)
-- Name: Role id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET postgres nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 3289 (class 2604 OID 196719)
-- Name: Room id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET postgres nextval('public."Room_id_seq"'::regclass);


--
-- TOC entry 3294 (class 2604 OID 222361)
-- Name: Skill id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Skill" ALTER COLUMN id SET postgres nextval('public.skill_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 196744)
-- Name: User id; Type: postgres; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET postgres nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3511 (class 0 OID 196623)
-- Dependencies: 217
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (1, ' Orientation professionnelle', 1);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (2, 'Création d''entreprise', 1);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (3, 'Accompagnement et soutien recherche formation/stage/alternance', 1);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (4, 'Autres', 1);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (5, 'Démarches administratives
', 2);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (6, ' Soutien scolaire', 2);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (7, 'Informatique', 3);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (8, 'Artisanat', 3);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (9, 'Marketing', 3);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (10, 'Cuisine', 3);
INSERT INTO public."Category" (id, name, "categoryTypeId") VALUES (11, 'Arts', 3);


--
-- TOC entry 3513 (class 0 OID 196632)
-- Dependencies: 219
-- Data for Name: CategoryType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CategoryType" (id, name) VALUES (1, 'PROFESSIONNEL');
INSERT INTO public."CategoryType" (id, name) VALUES (2, 'AIDE');
INSERT INTO public."CategoryType" (id, name) VALUES (3, 'PARTAGE COMPETENCES');


--
-- TOC entry 3535 (class 0 OID 196749)
-- Dependencies: 241
-- Data for Name: ComType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ComType" (id, name) VALUES (5, 'Visio');
INSERT INTO public."ComType" (id, name) VALUES (4, 'Téléphone');
INSERT INTO public."ComType" (id, name) VALUES (3, 'Messagerie');
INSERT INTO public."ComType" (id, name) VALUES (2, 'Email');
INSERT INTO public."ComType" (id, name) VALUES (1, 'Personne');


--
-- TOC entry 3515 (class 0 OID 196641)
-- Dependencies: 221
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Evaluation" (id, "createdAt", "studentId", "mentorId", value, comment) VALUES (1, '2024-06-26 12:06:31.106', 20, 1, 3, 'Pas terrible ....');
INSERT INTO public."Evaluation" (id, "createdAt", "studentId", "mentorId", value, comment) VALUES (3, '2024-06-26 12:08:22.537', 20, 18, 1, 'Nul !!!');
INSERT INTO public."Evaluation" (id, "createdAt", "studentId", "mentorId", value, comment) VALUES (4, '2024-06-26 12:08:22.537', 21, 19, 5, 'Très bon !');
INSERT INTO public."Evaluation" (id, "createdAt", "studentId", "mentorId", value, comment) VALUES (5, '2024-06-26 12:09:57.412', 21, 9, 2, 'Vraiment nul !');
INSERT INTO public."Evaluation" (id, "createdAt", "studentId", "mentorId", value, comment) VALUES (6, '2024-06-26 12:09:57.412', 21, 17, 5, 'Très très bien !');


--
-- TOC entry 3517 (class 0 OID 196651)
-- Dependencies: 223
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (4, '2024-06-26 13:54:38.967', 6, 20, 'Bonjour Mr MOULIN j''aimerais discuter avec vous.', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (5, '2024-06-26 13:54:38.967', 6, 19, 'Oui bien sur allons y parlons cuisine.', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (6, '2024-06-26 13:56:10.35', 6, 20, 'Je vous explique ma femme adore la crème fraiche mais je ne sais pas cuisiner avec ... :( :( :( :( ', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (7, '2024-06-26 13:56:49.67', 6, 19, 'Vous irez plus vite à changer de femme car cuisiner à la crème ne s''apprend pas comme ca.', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (8, '2024-06-27 12:30:51.322', 6, 19, 'Si vous voulez divorcer je connais un très bon avocat ...', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (9, '2024-06-27 13:35:56.13', 7, 9, 'Wesh', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (10, '2024-06-27 13:35:23.383', 7, 19, 'Désolé je ne parles pas allemand', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (11, '2024-06-28 08:42:09.485', 8, 19, 'Bonjour', 0);
INSERT INTO public."Message" (id, "sentAt", "roomId", "senderId", content, status) VALUES (12, '2024-06-28 08:42:17.406', 8, 30, 'Bonjour', 0);


--
-- TOC entry 3520 (class 0 OID 196669)
-- Dependencies: 226
-- Data for Name: Offer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (7, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 2, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (5, '2024-05-22 00:00:00', 'Mentorat idéal pour commencer la couture ! Le crochet vous fait peur ? N''ayez craint je le pratique depuis 40 ans et tous mes petits enfant n''ont jamais eu à acheter de chaussettes !', 'Rambouillet', 1, 19, 'Apprendre la couture avec Jean;', 8);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (6, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peut mais je serais la pour vous guider si vous le souhaitez.', 'Versaille', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (1, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (8, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (9, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (2, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (3, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (4, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (12, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Anger', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (16, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (18, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.', 'Versailles', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (19, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 1, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (20, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (21, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (22, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (23, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (24, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (25, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands-parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (26, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Angers', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (27, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (28, '2024-05-22 00:00:00', 'Je souhaite vous guider dans votre création d''entreprise. La création d''entreprise peut faire peur mais je serais là pour vous guider si vous le souhaitez.', 'Versailles', 1, 1, 'Aide à la création d''entreprise.', 2);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (29, '2024-05-22 00:00:00', 'Cours de peinture à l''huile pour débutants et intermédiaires, exploration des techniques et de la théorie des couleurs.', 'Toulouse', 1, 9, 'Mentorat en Peinture à l''Huile', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (30, '2024-05-22 00:00:00', 'Aide à la gestion de projet pour améliorer vos compétences en leadership et communication.', 'Paris', 1, 1, 'Mentorat en Gestion de Projet', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (31, '2024-05-22 00:00:00', 'Ateliers de sculpture sur bois, du choix du matériau à la finition des œuvres.', 'Brest', 1, 17, 'Mentorat en Sculpture sur Bois', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (32, '2024-05-22 00:00:00', 'Sessions de photographie artistique, exploration de la lumière et de la composition pour créer des œuvres uniques.', 'Dijon', 1, 18, 'Mentorat en Photographie Artistique', 11);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (33, '2024-05-22 00:00:00', 'Développement web front-end et back-end, base de données et sécurité.', 'Lyon', 1, 9, 'Mentorat en Développement Web', 7);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (34, '2024-05-22 00:00:00', 'Stratégies de marketing digital, SEO/SEA et analyse de données.', 'Marseille', 1, 17, 'Mentorat en Marketing Digital', 9);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (35, '2024-05-22 00:00:00', 'Je souhaite vous aider à apprendre la potterie à la terre cuite traditionnelle comme je l''ai apprise de mes grands-parents.', 'Rouen', 1, 18, 'Atelier Potterie en ligne et en direct.', 8);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (36, '2024-06-08 13:51:18.452', 'Cours de cuisine française traditionnelle, exploration des techniques de base et des recettes classiques.', 'Angers', 1, 19, 'Mentorat en Cuisine Française', 10);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (37, '2024-06-22 13:34:50.757', 'Assistance pour les démarches administratives, incluant la préparation des documents et la compréhension des procédures.', 'Strasbourg', 2, 1, 'Mentorat en Démarches Administratives', 5);
INSERT INTO public."Offer" (id, "createdAt", content, location, status, "mentorId", title, "categoryId") VALUES (43, '2024-06-28 08:38:55.051', 'Je vais vous apprendre à faire du covering sur votre voiture. Je vous propose des rencontres dans mon garage avec bière et saucisson dans la bonne humeur.', 'Rouen', 1, 30, 'Comment tuner sa voiture avec du covering. ', 8);


--
-- TOC entry 3540 (class 0 OID 230560)
-- Dependencies: 246
-- Data for Name: OfferComType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OfferComType" ("offerId", "comTypeId") VALUES (12, 3);
INSERT INTO public."OfferComType" ("offerId", "comTypeId") VALUES (12, 4);
INSERT INTO public."OfferComType" ("offerId", "comTypeId") VALUES (16, 2);
INSERT INTO public."OfferComType" ("offerId", "comTypeId") VALUES (16, 3);
INSERT INTO public."OfferComType" ("offerId", "comTypeId") VALUES (43, 1);


--
-- TOC entry 3518 (class 0 OID 196660)
-- Dependencies: 224
-- Data for Name: OfferStudent; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (21, '2024-06-23 11:31:46.758', 2, 'Bonjour, je voudrais échanger avec vous', 2);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (21, '2024-06-23 11:32:13.265', 16, 'Bonjour, je voudrais échanger avec vous', 2);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (20, '2024-06-23 10:37:05.548', 12, 'Bonjour, je voudrais échanger avec vous', 1);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (19, '2024-06-27 12:18:30.507', 25, 'salut jean ca va ? ca jardinne ?', 0);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (9, '2024-06-27 13:33:37.137', 5, 'Wesh, je veux apprendre la couture Jean stp', 1);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (9, '2024-06-27 13:36:53.589', 12, 'Mais si stp', 2);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (29, '2024-06-28 08:40:31.548', 43, 'Bonjour, oui', 0);
INSERT INTO public."OfferStudent" ("studentId", date, "offerId", message, status) VALUES (19, '2024-06-28 08:40:34.583', 43, 'J''aimerais en apprendre un peu plus', 1);


--
-- TOC entry 3522 (class 0 OID 196679)
-- Dependencies: 228
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3525 (class 0 OID 196697)
-- Dependencies: 231
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3523 (class 0 OID 196688)
-- Dependencies: 229
-- Data for Name: RequestMentor; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3527 (class 0 OID 196707)
-- Dependencies: 233
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Role" (id, name) VALUES (1, 'ADMIN');
INSERT INTO public."Role" (id, name) VALUES (2, 'USER');


--
-- TOC entry 3529 (class 0 OID 196716)
-- Dependencies: 235
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Room" (id, "createdAt", name, "offerId") VALUES (6, '2024-06-26 13:41:25.109', 'New room', 12);
INSERT INTO public."Room" (id, "createdAt", name, "offerId") VALUES (7, '2024-06-27 13:33:40.143', 'Apprendre la couture avec Jean;', 5);
INSERT INTO public."Room" (id, "createdAt", name, "offerId") VALUES (8, '2024-06-28 08:41:25.749', 'Comment tuner sa voiture avec du covering. ', 43);


--
-- TOC entry 3530 (class 0 OID 196725)
-- Dependencies: 236
-- Data for Name: SavedOffer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SavedOffer" ("userId", "offerId") VALUES (17, 4);
INSERT INTO public."SavedOffer" ("userId", "offerId") VALUES (20, 6);
INSERT INTO public."SavedOffer" ("userId", "offerId") VALUES (19, 43);


--
-- TOC entry 3531 (class 0 OID 196730)
-- Dependencies: 237
-- Data for Name: SavedRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3537 (class 0 OID 196761)
-- Dependencies: 243
-- Data for Name: Skill; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Skill" (id, name) VALUES (1, 'Informatique');
INSERT INTO public."Skill" (id, name) VALUES (4, 'Artisanat');
INSERT INTO public."Skill" (id, name) VALUES (5, 'Poterie');


--
-- TOC entry 3536 (class 0 OID 196756)
-- Dependencies: 242
-- Data for Name: SkillCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SkillCategory" ("skillId", "categoryId") VALUES (5, 8);
INSERT INTO public."SkillCategory" ("skillId", "categoryId") VALUES (4, 8);
INSERT INTO public."SkillCategory" ("skillId", "categoryId") VALUES (1, 7);


--
-- TOC entry 3534 (class 0 OID 196741)
-- Dependencies: 240
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (20, 'Henri', 'COCHET', 'h-cochet@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', NULL, 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (19, 'Jean', 'MOULIN', 'j-moulin@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', '/uploads/avatar/moulin-1719491855663-233142046.jpeg', 1, 'une description de mentor ...', '2024-06-25 00:00:00', 'Cuisine traditionnelle
Cuisine africaine
Cuisine normande à la créme fraiche', 2, '2024-06-25 09:36:17.984');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (21, 'Jacques', 'COUCHE', 'jacouche@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description ...', '1990-11-08 00:00:00', NULL, 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (1, 'Jean-Jacques', 'GOLDMAN', 'jjg@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', 'Gestion de projet
Leadership
Communication efficace', 2, '2024-05-23 11:44:09.735');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (9, 'Jean-Claude', 'VAN DAMME', 'jcvd@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-11-08 00:00:00', 'Développement web
Base de données
Sécurité informatique', 2, '2024-05-25 16:29:20.964');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (22, 'Damien', 'COTE', 'dcote@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, NULL, '1990-11-08 00:00:00', NULL, 1, '2024-05-23 11:44:09.735');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (17, 'Jean-Francois', 'COPE', 'jaimelargent@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', '/uploads/avatar/bb37318462c90131d1db4da0e68399dc-1719304201662-459386511.png', 1, 'une description de mentor ...', '2024-06-02 00:00:00', 'Marketing digital
SEO/SEA
Analyse de données', 2, '2024-06-02 12:35:48.57');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (18, 'Jean', 'DUJARDIN', 'j-dujardin@test.fr', '$2b$10$anygZDlcyQ0l16JaTY3lJe.tUFXyeE/DEN0ZG7/s/AzktwZJSXjcy', NULL, 1, 'une description de mentor ...', '1990-06-23 10:36:17.45', 'Intelligence artificielle
Apprentissage automatique
Traitement du langage naturel', 2, '1990-06-23 10:36:17.451');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (28, 'test', 'test', 'tesjfdsd@ui.fr', '$2b$10$85iKlA4IRuoPZnB4yDm.dujVm27nrUJbjA5ePlHxUP4qEHjE15kb2', NULL, 1, NULL, '2024-06-28 08:04:34.981', NULL, 2, '2024-06-28 08:04:36.126');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (29, 'Alexis', 'Petit', 'contact@alexis-petit.fr', '$2b$10$DaRZ3IPN46Af0M0o.a0VTuTXxQq0rx0OL9gCn1W8fHUzgvfZcyB0.', NULL, 1, NULL, '2024-06-28 08:36:49.708', NULL, 2, '2024-06-28 08:36:50.839');
INSERT INTO public."User" (id, firstname, lastname, email, password, avatar, status, description, birthdate, experiences, "roleId", "registerAt") VALUES (30, 'Jean', 'Tallut', 'j-tallut@test.fr', '$2b$10$QJ1kEkgcKfCF2F8N/sUr.OUe5GrgEBOxPy6nKGZ4Kwm/bd9id2oNO', NULL, 1, NULL, '2024-06-28 08:36:56.724', NULL, 2, '2024-06-28 08:36:56.725');


--
-- TOC entry 3532 (class 0 OID 196735)
-- Dependencies: 238
-- Data for Name: UserRoom; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (20, 6);
INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (19, 6);
INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (19, 7);
INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (9, 7);
INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (30, 8);
INSERT INTO public."UserRoom" ("userId", "roomId") VALUES (19, 8);


--
-- TOC entry 3538 (class 0 OID 196773)
-- Dependencies: 244
-- Data for Name: UserSkill; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3509 (class 0 OID 196611)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('6a4061ee-67a7-4d0e-a1a7-f4c5da7b72ab', '7a4c5192fbbce45d75104a1dc980a0379a00903cd6e87958fefd5242efd25908', '2024-05-23 11:00:41.104492+00', '20240523110040_initial_migration', NULL, NULL, '2024-05-23 11:00:40.576715+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bf987753-7a7e-456d-868d-8f4a327d18e8', 'fae0d8791e9b600a9851af8baac5f6acd114ca9eb83b23f85b9a6505dcdd289c', '2024-05-23 11:44:08.34157+00', '20240523114407_ajout_register_at_in_user', NULL, NULL, '2024-05-23 11:44:07.944421+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('44f15dc1-0bd8-4a6b-9e1f-b7070f99d886', '0da6399cd85b9a61151e11f8bfd62b09008cad5ecab00514ec4025d8ebf805cd', '2024-05-24 10:24:10.838593+00', '20240524102410_modification_id_skill', NULL, NULL, '2024-05-24 10:24:10.740438+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('427f74f0-3447-431c-b2de-af6b5bfc4c4a', '5d5ada1990b5f3bcf93d93fc8f2786fcbc1cf1c54d7203b11f08bb884ee959e9', '2024-05-24 14:23:09.087797+00', '20240524142308_suppression_lien_comptype_to_user_and_added_it_to_offer', NULL, NULL, '2024-05-24 14:23:08.964001+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2c4f25c5-f12e-466c-96c0-c4393414eccf', 'fe57f42fd2b106d8267652a1008b48995e2ea838d99dea2b7519be46013e79b8', '2024-06-22 12:40:05.794688+00', '20240622124005_add_status_to_reports', NULL, NULL, '2024-06-22 12:40:05.70843+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('48129082-a2fa-4ffb-b028-15c0c0d474f1', '2d706090e3c92d1735bfb0ed4e4d07b8ce815825445b8658eb9162a3d64111d7', '2024-06-24 09:37:38.917187+00', '20240624093738_ajout', NULL, NULL, '2024-06-24 09:37:38.508024+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('98f1664d-fe39-4564-8ede-6310c993db61', '51bb90d8815d739efdc539651b136ef57c3645b8ae65372aefac015962ca8797', '2024-06-24 09:39:58.026754+00', '20240624093955_ajout', NULL, NULL, '2024-06-24 09:39:57.432826+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('da702665-bc8d-4daa-99e7-ec91e4cca94c', '26d057ee6df9a6faa5acebb91cbfede69e5c7b0c047f1609a7f8c861533ea080', '2024-06-28 07:32:54.30689+00', '20240628073253_fix_autoincrement', NULL, NULL, '2024-06-28 07:32:53.96372+00', 1);


--
-- TOC entry 3560 (class 0 OID 0)
-- Dependencies: 218
-- Name: CategoryType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoryType_id_seq"', 1, false);


--
-- TOC entry 3561 (class 0 OID 0)
-- Dependencies: 216
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, true);


--
-- TOC entry 3562 (class 0 OID 0)
-- Dependencies: 220
-- Name: Evaluation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Evaluation_id_seq"', 6, true);


--
-- TOC entry 3563 (class 0 OID 0)
-- Dependencies: 222
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 12, true);


--
-- TOC entry 3564 (class 0 OID 0)
-- Dependencies: 225
-- Name: Offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Offer_id_seq"', 43, true);


--
-- TOC entry 3565 (class 0 OID 0)
-- Dependencies: 227
-- Name: Report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Report_id_seq"', 1, false);


--
-- TOC entry 3566 (class 0 OID 0)
-- Dependencies: 230
-- Name: Request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Request_id_seq"', 1, false);


--
-- TOC entry 3567 (class 0 OID 0)
-- Dependencies: 232
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 1, false);


--
-- TOC entry 3568 (class 0 OID 0)
-- Dependencies: 234
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 8, true);


--
-- TOC entry 3569 (class 0 OID 0)
-- Dependencies: 239
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 30, true);


--
-- TOC entry 3570 (class 0 OID 0)
-- Dependencies: 247
-- Name: comtype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comtype_id_seq', 1, false);


--
-- TOC entry 3571 (class 0 OID 0)
-- Dependencies: 245
-- Name: skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skill_id_seq', 5, true);


--
-- TOC entry 3300 (class 2606 OID 196639)
-- Name: CategoryType CategoryType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryType"
    ADD CONSTRAINT "CategoryType_pkey" PRIMARY KEY (id);


--
-- TOC entry 3298 (class 2606 OID 196630)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 3329 (class 2606 OID 196755)
-- Name: ComType ComType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComType"
    ADD CONSTRAINT "ComType_pkey" PRIMARY KEY (id);


--
-- TOC entry 3302 (class 2606 OID 196649)
-- Name: Evaluation Evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY (id);


--
-- TOC entry 3304 (class 2606 OID 196659)
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- TOC entry 3337 (class 2606 OID 230564)
-- Name: OfferComType OfferComType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferComType"
    ADD CONSTRAINT "OfferComType_pkey" PRIMARY KEY ("offerId", "comTypeId");


--
-- TOC entry 3306 (class 2606 OID 196667)
-- Name: OfferStudent OfferStudent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferStudent"
    ADD CONSTRAINT "OfferStudent_pkey" PRIMARY KEY ("offerId", "studentId");


--
-- TOC entry 3308 (class 2606 OID 196677)
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (id);


--
-- TOC entry 3310 (class 2606 OID 196687)
-- Name: Report Report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_pkey" PRIMARY KEY (id);


--
-- TOC entry 3312 (class 2606 OID 196695)
-- Name: RequestMentor RequestMentor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestMentor"
    ADD CONSTRAINT "RequestMentor_pkey" PRIMARY KEY ("mentorId", "requestId");


--
-- TOC entry 3314 (class 2606 OID 196705)
-- Name: Request Request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY (id);


--
-- TOC entry 3316 (class 2606 OID 196714)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 3318 (class 2606 OID 196724)
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- TOC entry 3320 (class 2606 OID 196729)
-- Name: SavedOffer SavedOffer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedOffer"
    ADD CONSTRAINT "SavedOffer_pkey" PRIMARY KEY ("userId", "offerId");


--
-- TOC entry 3322 (class 2606 OID 196734)
-- Name: SavedRequest SavedRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedRequest"
    ADD CONSTRAINT "SavedRequest_pkey" PRIMARY KEY ("userId", "requestId");


--
-- TOC entry 3331 (class 2606 OID 196760)
-- Name: SkillCategory SkillCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SkillCategory"
    ADD CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("categoryId", "skillId");


--
-- TOC entry 3333 (class 2606 OID 196767)
-- Name: Skill Skill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Skill"
    ADD CONSTRAINT "Skill_pkey" PRIMARY KEY (id);


--
-- TOC entry 3324 (class 2606 OID 196739)
-- Name: UserRoom UserRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoom"
    ADD CONSTRAINT "UserRoom_pkey" PRIMARY KEY ("userId", "roomId");


--
-- TOC entry 3335 (class 2606 OID 196777)
-- Name: UserSkill UserSkill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSkill"
    ADD CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("userId", "skillId");


--
-- TOC entry 3327 (class 2606 OID 196748)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3296 (class 2606 OID 196619)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3325 (class 1259 OID 196778)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3338 (class 2606 OID 196779)
-- Name: Category Category_categoryTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES public."CategoryType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3339 (class 2606 OID 196784)
-- Name: Evaluation Evaluation_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3340 (class 2606 OID 196789)
-- Name: Evaluation Evaluation_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3341 (class 2606 OID 196794)
-- Name: Message Message_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3342 (class 2606 OID 196799)
-- Name: Message Message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3364 (class 2606 OID 230565)
-- Name: OfferComType OfferComType_comTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferComType"
    ADD CONSTRAINT "OfferComType_comTypeId_fkey" FOREIGN KEY ("comTypeId") REFERENCES public."ComType"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3365 (class 2606 OID 230570)
-- Name: OfferComType OfferComType_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferComType"
    ADD CONSTRAINT "OfferComType_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public."Offer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3343 (class 2606 OID 196804)
-- Name: OfferStudent OfferStudent_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferStudent"
    ADD CONSTRAINT "OfferStudent_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public."Offer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3344 (class 2606 OID 196809)
-- Name: OfferStudent OfferStudent_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OfferStudent"
    ADD CONSTRAINT "OfferStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3345 (class 2606 OID 196814)
-- Name: Offer Offer_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3346 (class 2606 OID 196819)
-- Name: Offer Offer_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3347 (class 2606 OID 196824)
-- Name: Report Report_reporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3348 (class 2606 OID 196829)
-- Name: Report Report_targetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "Report_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3349 (class 2606 OID 196834)
-- Name: RequestMentor RequestMentor_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestMentor"
    ADD CONSTRAINT "RequestMentor_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 196839)
-- Name: RequestMentor RequestMentor_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RequestMentor"
    ADD CONSTRAINT "RequestMentor_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3351 (class 2606 OID 196844)
-- Name: Request Request_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3352 (class 2606 OID 247946)
-- Name: Room Room_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public."Offer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3353 (class 2606 OID 196849)
-- Name: SavedOffer SavedOffer_offerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedOffer"
    ADD CONSTRAINT "SavedOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES public."Offer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3354 (class 2606 OID 196854)
-- Name: SavedOffer SavedOffer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedOffer"
    ADD CONSTRAINT "SavedOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3355 (class 2606 OID 196859)
-- Name: SavedRequest SavedRequest_requestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedRequest"
    ADD CONSTRAINT "SavedRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES public."Request"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3356 (class 2606 OID 196864)
-- Name: SavedRequest SavedRequest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SavedRequest"
    ADD CONSTRAINT "SavedRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3360 (class 2606 OID 196884)
-- Name: SkillCategory SkillCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SkillCategory"
    ADD CONSTRAINT "SkillCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3361 (class 2606 OID 196889)
-- Name: SkillCategory SkillCategory_skillId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SkillCategory"
    ADD CONSTRAINT "SkillCategory_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES public."Skill"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3357 (class 2606 OID 196869)
-- Name: UserRoom UserRoom_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoom"
    ADD CONSTRAINT "UserRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3358 (class 2606 OID 196874)
-- Name: UserRoom UserRoom_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoom"
    ADD CONSTRAINT "UserRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3362 (class 2606 OID 196904)
-- Name: UserSkill UserSkill_skillId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSkill"
    ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES public."Skill"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3363 (class 2606 OID 196909)
-- Name: UserSkill UserSkill_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSkill"
    ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3359 (class 2606 OID 196879)
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id);


--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- TOC entry 2130 (class 826 OID 212993)
-- Name: postgres PRIVILEGES FOR SEQUENCES; Type: postgres ACL; Schema: public; Owner: cloud_admin
--

ALTER postgres PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2129 (class 826 OID 212992)
-- Name: postgres PRIVILEGES FOR TABLES; Type: postgres ACL; Schema: public; Owner: cloud_admin
--

ALTER postgres PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-06-30 15:49:30 CEST

--
-- PostgreSQL database dump complete
--

