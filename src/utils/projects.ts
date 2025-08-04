import gh from "../assets/gh.png";
import truco from "../assets/truco.jpeg";
import alacarta from "../assets/alacarta.png";
import gymchad from "../assets/gymchad.png";
import routine_manager from "../assets/routine.png";
import save_the_galaxy from "../assets/save_the_galaxy.png";
import jazz from "../assets/jazz.jpg";
import ai from "../assets/ai.png";
import etl from "../assets/etl.jpg";
import nlp from "../assets/nlp.jpg";
import donkey from "../assets/donkey.jpg";
import concuride from "../assets/concuride.jpg";
import udp from "../assets/udp.jpg";
import classconnect from "../assets/cc.png";
import firewall from "../assets/firewall.jpg";

const english_sys_projects = [
    {
        name: "ClassConnect",
        description: "ClassConnect is a cloud-native educational platform built on a distributed microservices architecture. It features a Kubernetes-based deployment, managed via Infrastructure as Code and automated with CI/CD pipelines. Monitoring is handled through Datadog for full observability. <br><br> The system supports both a React Native mobile app (for teachers and students) and a React web app (for administrators). It includes six microservices developed in Go (Gin Gonic) and Python (FastAPI), each with its own database using Supabase or MongoDB Atlas, all with >75% test coverage. An additional AI microservice powered by Gemini 2.0 Flash enables LLM-based assistance.",
        image: classconnect,
        url: "https://github.com/ClassConnect-org",
        vid: "https://www.youtube.com/watch?v=MnToP9unGNQ",
        technologies: ["Microservices", "Datadog", "Cloud-Computing", "LLM", "Kubernetes", "Kong-Gateway"]
    },
    {
        name: "SDN Firewall",
        description: "Software-Defined Networking (SDN) solution featuring a dynamic firewall built with POX and Mininet.<br><br>The project follows a modular Docker-based architecture that separates network emulation from controller logic, and uses Python 3 (with custom patches for POX compatibility).<br><br>Key features include:<br>- JSON-based configuration for defining IP, port, and protocol filtering rules.<br>- Centralized traffic control over OpenFlow switches via the POX controller.<br>- Automated testing and traffic validation using Mininet and Wireshark.<br><br>The system supports practical scenarios such as blocking HTTP traffic, dropping UDP flows, and restricting communication between specific hosts. It also addresses challenges like Python 3 migration and testing in more complex topologies.",
        image: firewall,
        url: "",
        vid: "",
        technologies: ["Pox", "Mininet", "Wireshark", "Python"]
    },
    {
        name: "RDT protocol over UDP",
        description: "Reliable file transfer protocol built over UDP. The project implements two recovery strategies—Stop-and-Wait and Go-Back-N—designed to handle high packet loss and maintain connection integrity.<br><br>The server uses an asynchronous architecture that supports multiple concurrent clients, with custom packet headers for tracking sequence and acknowledgment numbers.<br><br>Key features include:<br>- 6-byte application-layer header with sequence/ACK support.<br>- Connection multiplexing with event-driven server logic.<br>- Mininet-tested: Go-Back-N achieved 2.8× speedup under 20% packet loss.<br><br>The project focused on building a lightweight, robust protocol with strong fault tolerance and real-time performance analysis in emulated networks.",
        image: udp,
        url: "https://github.com/maxogod/RDT-over-UDP",
        vid: "",
        technologies: ["Mininet", "Wireshark", "Python"]
    },
    {
        name: "ConcuRide",
        description: "ConcuRide is a distributed system built in Rust that connects passengers and drivers efficiently using advanced concurrency and distributed techniques. It employs the actor model for message handling, the Ring algorithm for coordinator election, and ensures resilience to failures, providing robust and scalable functionality.",
        image: concuride,
        url: "https://github.com/maxogod/ConcuRide",
        vid: "https://www.youtube.com/watch?v=8ktItIcETTw&ab_channel=MaxoFiuba",
        technologies: ["Rust"]
    },
    {
        name: "Check out my github for more!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const spanish_sys_projects = [
    {
        name: "ClassConnect",
        description: "ClassConnect es una plataforma educativa cloud-native construida sobre una arquitectura distribuida de microservicios. Cuenta con un despliegue en Kubernetes, gestionado mediante Infrastructure as Code y automatizado con pipelines CI/CD. El monitoreo se realiza con Datadog para lograr una observabilidad completa.<br><br>El sistema soporta una aplicación móvil en React Native (para docentes y estudiantes) y una aplicación web en React (para administradores). Incluye seis microservicios desarrollados en Go (Gin Gonic) y Python (FastAPI), cada uno con su propia base de datos utilizando Supabase o MongoDB Atlas, todos con una cobertura de tests superior al 75%. Un microservicio adicional de IA, impulsado por Gemini 2.0 Flash, permite asistencia basada en modelos LLM.",
        image: classconnect,
        url: "https://github.com/ClassConnect-org",
        vid: "https://www.youtube.com/watch?v=MnToP9unGNQ",
        technologies: ["Microservices", "Datadog", "Cloud-Computing", "LLM", "Kubernetes", "Kong-Gateway"]
    },
    {
        name: "ConcuRide",
        description: "ConcuRide es un sistema distribuido desarrollado en Rust que conecta pasajeros y conductores de manera eficiente, utilizando técnicas avanzadas de concurrencia y distribución. Emplea el modelo de actores para la gestión de mensajes, el algoritmo de anillo para la elección de coordinadores, y garantiza resiliencia ante fallos, ofreciendo funcionalidad robusta y escalable.",
        image: concuride,
        url: "https://github.com/maxogod/ConcuRide",
        vid: "https://www.youtube.com/watch?v=8ktItIcETTw&ab_channel=MaxoFiuba",
        technologies: ["Rust"]
    },
    {
        name: "Visita mi github para mas!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const english_web_projects = [
    {
        name: "Truco",
        description: "Online game of the popular argentinian card game Truco with 1vs1 matches, challenges, global ranking and more! Built employing Agile Methodologies.",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "https://www.youtube.com/watch?v=Vi6hB6-XCsY",
        technologies: ["Scrum", "MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "AlaCarta",
        description: "Backoffice website for restaurants to manage their menu, orders, tables, see product insights, and more. Developed using TypeScript and the MERN stack.",
        image: alacarta,
        url: "https://github.com/maxogod/AlaCarta",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "GymChad",
        description: "Website to organize different fitness activities such as dancing/boxing and the exercises that belong to those activities, including images, descriptions, sets/reps, etc.",
        image: gymchad,
        url: "https://github.com/maxogod/gymchad-app",
        vid: "",
        technologies: ["MongoDB", "Springboot", "Angular", "TypeScript", "Java"]
    },
    {
        name: "Routine Manager",
        description: "Personal organizer for daily routines, with the ability to create, edit, delete, and visualize routines. Developed using Django, React and Google APIs.",
        image: routine_manager,
        url: "https://github.com/maxogod/Routine-Manager",
        vid: "https://www.youtube.com/watch?v=hAaZC-RAX24",
        technologies: ["MySql", "Django", "React", "Python", "JavaScript"]
    },
    {
        name: "Check out my github for more!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const spanish_web_projects = [
    {
        name: "Truco",
        description: "Juego en línea del popular juego de cartas argentino Truco con partidas 1vs1, desafíos, ranking global ¡y más! Desarrollado utilizando metodologías ágiles.",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "https://www.youtube.com/watch?v=Vi6hB6-XCsY",
        technologies: ["Scrum", "MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "AlaCarta",
        description: "Sitio web de backoffice para restaurantes para gestionar su menú, pedidos, mesas, ver información estadistica de productos y más. Desarrollado usando TypeScript y el stack MERN.",
        image: alacarta,
        url: "https://github.com/maxogod/AlaCarta",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "GymChad",
        description: "Sitio web para organizar diferentes actividades de fitness como baile/boxeo y los ejercicios que pertenecen a esas actividades, incluyendo imágenes, descripciones, series/repeticiones, etc.",
        image: gymchad,
        url: "https://github.com/maxogod/gymchad-app",
        vid: "",
        technologies: ["MongoDB", "Springboot", "Angular", "TypeScript", "Java"]
    },
    {
        name: "Routine Manager",
        description: "Organizador personal para rutinas diarias, con la capacidad de crear, editar, eliminar y visualizar rutinas. Desarrollado usando Django, React y APIs de Google.",
        image: routine_manager,
        url: "https://github.com/maxogod/Routine-Manager",
        vid: "https://www.youtube.com/watch?v=hAaZC-RAX24",
        technologies: ["MySql", "Django", "React", "Python", "JavaScript"]
    },
    {
        name: "Visita mi github para mas!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const english_datasci_projects = [
    {
        name: "Donkey Kong AI",
        description: "The project focuses on training an AI agent to complete the first level of Donkey Kong using reinforcement learning with the Proximal Policy Optimization (PPO) algorithm. <br><br> The environment was built in Unity with ML-Agents, and the model was trained using PyTorch. The agent learns to avoid barrels, climb ladders, and rescue the princess through dynamic interaction and a well-designed reward system. Hyperparameter tuning and iterative testing ensured stable and adaptive performance, demonstrating the effectiveness of reinforcement learning in complex game environments.",
        image: donkey,
        url: "https://github.com/maxogod/AI-Donkey-Kong",
        vid: "https://www.youtube.com/watch?v=5XQuDkWKL-M",
        technologies: ["Unity", "Pytorch", "Conda", "Reinforcement Learning"]
    },
    {
        name: "Property Price Analysis & Prediction",
        description: "Used a dataset of real properties in Buenos Aires extracted with BigQuery. This project consisted of 4 main parts: Pre-processing, Clusterization & analysis, Classification of property prices (low/mid/high), Regression (prediction) of property price with different ML models. Some of the used models were Random Forest, XGBoost, Decision Trees, KNN.",
        image: ai,
        url: "https://github.com/maxogod/DATA-SCIENCE/blob/main/TP1/7506R_TP1_GRUPO02_REPORTE.pdf",
        vid: "",
        technologies: ["Machine Learning", "Python", "ScikitLearn", "Pandas", "GoogleColab"]
    },
    {
        name: "Natural Languaje Processing",
        description: "[Kaggle Competition] Made a sentiment analysis of a movie reviews dataset and made different ML models to determine whether a sample is positive or negative. This models included Neural Networks, Ensembles, XGBoosts, Random Forests and Naive Bayes.",
        image: nlp,
        url: "https://github.com/maxogod/DATA-SCIENCE/blob/main/TP2/7506R_TP2_GRUPO02_REPORTE.pdf",
        vid: "",
        technologies: ["Machine Learning", "Python", "TensorFlow", "ScikitLearn", "Pandas", "GoogleColab"]
    },
    {
        name: "Extract, Transform & Load Real Estate Data",
        description: "Extracted real estate data from a kaggle competition dataset with more than a million registers, processed it by cleaning and preparing it to be stored in a relational database, and loaded it into a BCNF (Boyce-Codd) normalized database.",
        image: etl,
        url: "https://github.com/maxogod/ETL-Real-Estate/blob/main/informe.pdf",
        vid: "",
        technologies: ["Python", "GoogleColab", "Pandas", "SQL"]
    },
    {
        name: "Check out my github for more!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const spanish_datasci_projects = [
    {
        name: "Donkey Kong AI",
        description: "El proyecto se centra en entrenar a un agente de IA para completar el primer nivel de Donkey Kong utilizando aprendizaje por refuerzo con el algoritmo de Proximal Policy Optimization (PPO). <br><br> El entorno se desarrolló en Unity con ML-Agents, y el modelo se entrenó usando PyTorch. El agente aprende a esquivar barriles, subir escaleras y rescatar a la princesa mediante interacción dinámica y un sistema de recompensas bien diseñado. La optimización de hiperparámetros y pruebas iterativas garantizaron un rendimiento estable y adaptativo, demostrando la efectividad del aprendizaje por refuerzo en entornos complejos de videojuegos.",
        image: donkey,
        url: "https://github.com/maxogod/AI-Donkey-Kong",
        vid: "https://www.youtube.com/watch?v=5XQuDkWKL-M",
        technologies: ["Unity", "Pytorch", "Conda", "Reinforcement Learning"]
    },
    {
        name: "Análisis y Predicción de Precios de Propiedades",
        description: "Se utilizó un conjunto de datos de propiedades reales en Buenos Aires extraído con BigQuery. Este proyecto constó de 4 partes principales: preprocesamiento, clusterización y análisis, clasificación de precios de propiedades (bajo/medio/alto), y regresión (predicción) del precio de la propiedad con diferentes modelos de ML. Algunos de los modelos utilizados fueron Random Forest, XGBoost, árboles de decisión y KNN.",
        image: ai,
        url: "https://github.com/maxogod/DATA-SCIENCE/blob/main/TP1/7506R_TP1_GRUPO02_REPORTE.pdf",
        vid: "",
        technologies: ["Machine Learning", "Python", "ScikitLearn", "Pandas", "GoogleColab"]
    },
    {
        name: "Procesamiento de Lenguaje Natural",
        description: "[Competencia de Kaggle] Se realizo un análisis de sentimientos de un conjunto de datos de reseñas de películas y se crearon diferentes modelos de ML para determinar si una muestra es positiva o negativa. Estos modelos incluyeron Redes Neuronales, Ensamblajes, XGBoost, Random Forest y Naive Bayes.",
        image: nlp,
        url: "https://github.com/maxogod/DATA-SCIENCE/blob/main/TP2/7506R_TP2_GRUPO02_REPORTE.pdf",
        vid: "",
        technologies: ["Machine Learning", "Python", "TensorFlow", "ScikitLearn", "Pandas", "GoogleColab"]
    },
    {
        name: "Extracción, Transformación y Carga de Datos Inmobiliarios",
        description: "Se extrajeron datos inmobiliarios de un conjunto de datos de una competencia de Kaggle con más de un millón de registros, fueron procesados limpiando y preparándolos para ser almacenados en una base de datos relacional, y fueron cargados en una base de datos normalizada en BCNF (Boyce-Codd).",
        image: etl,
        url: "https://github.com/maxogod/ETL-Real-Estate/blob/main/informe.pdf",
        vid: "",
        technologies: ["Python", "GoogleColab", "Pandas", "SQL"]
    },
    {
        name: "Visita mi github para mas!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const english_game_projects = [
    {
        name: "Jazz Jackrabbit 2 Remake",
        description: "An exciting reinvention of the classic platformer game, now with online matches of up to 8 players. Have frenetic face-offs with iconic characters like Jazz, Spaz, and Lori in various action-packed maps. Enjoy a variety of weapons, special items like invincibility carrots, and a custom map editor for a unique and immersive gaming experience. Developed from scratch (no 3rd-party game engines) using C++ and SDL2.",
        image: jazz,
        url: "https://atusgames.github.io/#/jazz-jackrabbit-2-remake",
        vid: "https://www.youtube.com/watch?v=yL4jmEFELbI",
        technologies: ["Scrum", "C++", "SDL2"]
    },
    {
        name: "Truco",
        description: "Online game of the popular argentinian card game Truco with 1vs1 matches, challenges, global ranking and more! Built employing Agile Methodologies.",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "https://www.youtube.com/watch?v=Vi6hB6-XCsY",
        technologies: ["Scrum", "MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "Save The Galaxy",
        description: "A thrilling adventure where the player takes on the role of the savior of the galaxy, fighting against an army of alien invaders. The enemy ships grow stronger and faster as the invasion progresses. If the player fails to fend off the aliens, they will colonize the galaxy, and the same fate awaits if the player perishes in the attempt.",
        image: save_the_galaxy,
        url: "https://maxogod.itch.io/save-the-galaxy",
        vid: "https://www.youtube.com/watch?v=u-lp5ocy8yI",
        technologies: ["Godot"]
    },
    {
        name: "Check out my github for more!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const spanish_game_projects = [
    {
        name: "Jazz Jackrabbit 2 Remake",
        description: "Una emocionante reinvención del clásico juego de plataformas, ahora con partidas en línea de hasta 8 jugadores. Enfréntate en frenéticas batallas con personajes icónicos como Jazz, Spaz y Lori en varios mapas llenos de acción. Disfruta de una variedad de armas, objetos especiales como zanahorias de invencibilidad y un editor de mapas personalizado para una experiencia de juego única e inmersiva. Desarrollado desde cero (sin motores de juego de terceros) usando C++ y SDL2.",
        image: jazz,
        url: "https://atusgames.github.io/#/jazz-jackrabbit-2-remake",
        vid: "https://www.youtube.com/watch?v=yL4jmEFELbI",
        technologies: ["Scrum", "C++", "SDL2"]
    },
    {
        name: "Truco",
        description: "Juego en línea del popular juego de cartas argentino Truco con partidas 1vs1, desafíos, ranking global ¡y más! Desarrollado utilizando metodologías ágiles.",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "https://www.youtube.com/watch?v=Vi6hB6-XCsY",
        technologies: ["Scrum", "MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "Save The Galaxy",
        description: "Una emocionante aventura en la que el jugador asume el rol del salvador de la galaxia, luchando contra un ejército de invasores alienígenas. Las naves enemigas se vuelven más fuertes y rápidas a medida que avanza la invasión. Si el jugador no logra repeler a los alienígenas, colonizarán la galaxia, y el mismo destino le espera si el jugador perece en el intento.",
        image: save_the_galaxy,
        url: "https://maxogod.itch.io/save-the-galaxy",
        vid: "https://www.youtube.com/watch?v=u-lp5ocy8yI",
        technologies: ["Godot"]
    },
    {
        name: "Visita mi github para mas!",
        description: "",
        image: gh,
        url: "https://github.com/maxogod",
        vid: "",
        technologies: []
    },
]

const technologyColors = {
    // DBs
    "MongoDB": "bg-pink-400",
    "MySql": "bg-pink-400",
    "PostgreSql": "bg-pink-400",
    "SQL": "bg-pink-400",

    // Backend
    "Node": "bg-green-300",
    "Express": "bg-slate-300",
    "Springboot": "bg-green-500",
    "Django": "bg-green-500",

    // Frontend
    "React": "bg-blue-400",
    "Angular": "bg-red-400",

    // Game Dev
    "Pygame": "bg-blue-200",
    "Godot": "bg-blue-300",
    "SDL2": "bg-red-400",
    "Unity": "bg-zinc-500",

    // Data Sci
    "Machine Learning": "bg-red-300",
    "Reinforcement Learning": "bg-fuchsia-400",
    "ScikitLearn": "bg-yellow-500",
    "Pandas": "bg-slate-500",
    "TensorFlow": "bg-orange-400",
    "GoogleColab": "bg-green-300",
    "Pytorch": "bg-orange-500",
    "Conda": "bg-green-500",

    // Languages
    "Python": "bg-blue-500",
    "Rust": "bg-orange-700",
    "Java": "bg-orange-400",
    "JavaScript": "bg-yellow-200",
    "TypeScript": "bg-blue-600",
    "C": "bg-slate-500",
    "C++": "bg-pink-300",
    "Go": "bg-blue-300",

    // Scripts
    "Shell": "bg-green-500",
    "PowerShell": "bg-blue-700",

    // Other
    "Scrum": "bg-yellow-400",
    "Microservices": "bg-indigo-400",
    "Kubernetes": "bg-blue-500",
    "Cloud-Computing": "bg-sky-300",
    "Datadog": "bg-purple-400",
    "LLM": "bg-rose-400",
    "Kong-Gateway": "bg-emerald-400",
    "Pox": "bg-cyan-400",
    "Mininet": "bg-cyan-500",
    "Wireshark": "bg-blue-600",
}

export {
    english_sys_projects,
    spanish_sys_projects,
    english_web_projects,
    spanish_web_projects,
    english_datasci_projects,
    spanish_datasci_projects,
    english_game_projects,
    spanish_game_projects,
    technologyColors,
};
