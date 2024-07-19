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


const english_web_projects = [
    {
        name: "Truco",
        description: "",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "https://www.youtube.com/watch?v=Vi6hB6-XCsY",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "AlaCarta",
        description: "",
        image: alacarta,
        url: "https://github.com/maxogod/AlaCarta",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "GymChad",
        description: "",
        image: gymchad,
        url: "https://github.com/maxogod/gymchad-app",
        vid: "",
        technologies: ["MongoDB", "Springboot", "Angular", "Java", "TypeScript"]
    },
    {
        name: "Routine Manager",
        description: "",
        image: routine_manager,
        url: "https://github.com/maxogod/Routine-Manager",
        vid: "",
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
        description: "",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "AlaCarta",
        description: "",
        image: alacarta,
        url: "https://github.com/maxogod/AlaCarta",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "GymChad",
        description: "",
        image: gymchad,
        url: "https://github.com/maxogod/gymchad-app",
        vid: "",
        technologies: ["MongoDB", "Springboot", "Angular", "Java", "TypeScript"]
    },
    {
        name: "Routine Manager",
        description: "",
        image: routine_manager,
        url: "https://github.com/maxogod/Routine-Manager",
        vid: "",
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
        name: "Property Price Classification & Prediction",
        description: "",
        image: ai,
        url: "https://github.com/maxogod/Tour-Package-Creator",
        vid: "",
        technologies: ["Machine Learning", "Jupiter Notebook", "Python"]
    },
    {
        name: "Natural Languaje Processing",
        description: "",
        image: nlp,
        url: "https://github.com/maxogod/hospital-management-system-datasci",
        vid: "",
        technologies: ["C", "PowerShell"]
    },
    {
        name: "Extract, Transform & Load Real Estate Data",
        description: "",
        image: etl,
        url: "https://github.com/maxogod/hospital-management-system-datasci",
        vid: "",
        technologies: ["C", "PowerShell"]
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
        name: "Tour package creator",
        description: "",
        image: ai,
        url: "https://github.com/maxogod/Tour-Package-Creator",
        vid: "",
        technologies: ["Python", "JavaScript"]
    },
    {
        name: "Procesamiento de Lenguaje Natural",
        description: "",
        image: nlp,
        url: "https://github.com/maxogod/hospital-management-system-datasci",
        vid: "",
        technologies: ["C", "PowerShell"]
    },
    {
        name: "Hospital managment system",
        description: "",
        image: etl,
        url: "https://github.com/maxogod/hospital-management-system-datasci",
        vid: "",
        technologies: ["C", "PowerShell"]
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
        description: "",
        image: jazz,
        url: "https://github.com/maxogod/Pysnake",
        vid: "",
        technologies: ["C++", "SDL2"]
    },
    {
        name: "Truco",
        description: "",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "Save The Galaxy",
        description: "",
        image: save_the_galaxy,
        url: "https://github.com/maxogod/Pysnake",
        vid: "",
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
        description: "",
        image: jazz,
        url: "https://github.com/maxogod/Pysnake",
        vid: "",
        technologies: ["C++", "SDL2"]
    },
    {
        name: "Truco",
        description: "",
        image: truco,
        url: "https://github.com/maxogod/Truco",
        vid: "",
        technologies: ["MongoDB", "Express", "React", "Node", "TypeScript"]
    },
    {
        name: "Save The Galaxy",
        description: "",
        image: save_the_galaxy,
        url: "https://github.com/maxogod/Pysnake",
        vid: "",
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
    "MongoDB": "bg-pink-400",
    "MySql": "bg-pink-400",
    "PostgreSql": "bg-pink-400",
    "Node": "bg-green-300",
    "Express": "bg-slate-300",
    "React": "bg-blue-400",
    "Springboot": "bg-green-500",
    "Angular": "bg-red-400",
    "Django": "bg-green-500",
    "Pygame": "bg-blue-200",
    "Godot": "bg-blue-300",
    "Python": "bg-blue-500",
    "Java": "bg-orange-400",
    "JavaScript": "bg-yellow-200",
    "TypeScript": "bg-blue-600",
    "C": "bg-slate-500",
    "C++": "bg-pink-300",
    "SDL2": "bg-red-400",
    "Go": "bg-blue-300",
    "Shell": "bg-green-500",
    "PowerShell": "bg-blue-700",
}

export {
    english_web_projects,
    spanish_web_projects,
    english_datasci_projects,
    spanish_datasci_projects,
    english_game_projects,
    spanish_game_projects,
    technologyColors,
};
