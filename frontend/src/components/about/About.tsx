import React, {useState, useEffect} from 'react';

import {
    MapPin,
    User,
    MessageSquare,
    Briefcase,
    Award,
    Plane,
    Building,
    GithubIcon
} from 'lucide-react';
import './about.css'
import api from "../../api";

function About() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prevData: any) => ({
            ...prevData,
            'message': e.target.value,
        }));
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        api.write(formData.name, formData.email, formData.message)

        setFormData({name: '', email: '', message: ''});
    };

    useEffect(() => {
        document.title = "Обо мне"
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const skills = {
        Languages: ['Java', 'JavaScript', 'HTML + CSS', 'TypeScript', 'C', 'NASM', 'Python'],
        OS: ['Windows 11/10', 'Ubuntu', 'Freebsd'],
        Tools: ['Git', 'Docker', 'PostgreSQL', 'Hibernate ORM', 'Spring Framework', 'Node.js', 'React']
    };

    return (
        <div>
            {/* Navigation */}
            <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    {[
                        {href: '#about', icon: User, text: 'Обо мне'},
                        {href: '#skills', icon: Award, text: 'Навыки'},
                        // { href: '#education', icon: BookOpen, text: 'Образование' },
                        {href: '#portfolio', icon: Briefcase, text: 'Портфолио'},
                        {href: '#contact', icon: MessageSquare, text: 'Контакты'}
                    ].map(({href, icon: Icon, text}) => (
                        <a key={href} href={href} className="nav-link">
                            <Icon size={16}/>
                            <span>{text}</span>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Вячеслав Петров</h1>
                    <h3>Java Backend Developer</h3>
                    <a href="#about" className="hero-button">Узнать больше</a>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section">
                <div className="section-container">
                    <h2 className="section-title">Обо мне</h2>
                    <div className="about-grid">
                        <img
                            // src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80"
                            src={"https://i.imgur.com/6BkraKx.png"}
                            alt="Profile"
                            className="about-image"
                        />
                        <div>
                            <p>
                                Я Java Backend разработчик. Учусь в ИТМО на специальности Системное и Прикладное
                                Программное Обеспечение (2 курс).
                                Постоянно изучаю новые технологии и применяю современные практики разработки.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section">
                <div className="section-container">
                    <h2 className="section-title">Навыки</h2>
                    <div className="skills-grid">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="skill-card">
                                <h3 className="skill-title">
                                    {category}
                                </h3>
                                <div className="skill-tags">
                                    {items.map((skill) => (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="section">
                <div className="section-container">
                    <h2 className="section-title">Портфолио</h2>
                    <div className="portfolio-grid">
                        {[
                            {
                                title: "Web platform with registration of hitting the target",
                                description: "Веб платформа для регистрации попадания точек, использующая двойную аутентификацию по почте для входа в аккаунт",
                                image: "https://i.imgur.com/g1PLWWr.png",
                                link: "http://parzi.ru/main",
                                link_about: "Ссылка на сайт проекта",
                                tags: ["HTML + CSS", "JS", 'TypeScript', "React", "PostgreSQL", "Java", "Spring", "Node.js", "Docker"]
                            },
                            {
                                title: "Application for registration and interaction with data (client.jar + server.jar)",
                                description: "Приложение с графическим интерфейсом для клиентской части, производящее взаимодействие с серверной на основе протокола UDP",
                                image: "https://i.imgur.com/NihwNfp.png",
                                link: "https://github.com/sub-myitmo/lab8-java",
                                link_about: "Ссылка на код (github)",
                                tags: ["Java", "Swing", "PostgreSQL"]
                            },
                            {
                                title: "Telegram Bot Helper",
                                description: "Телеграм бот с материалами для помощи по обучению на направлении СППО ИТМО",
                                image: "https://i.imgur.com/ZZio8jp.png",
                                link: "https://t.me/vt_itmo_bot",
                                link_about: "Ссылка на бота (телеграм)",
                                tags: ["Python", "SQLite", "Telebot"]
                            },
                            {
                                title: "Assignment image transform",
                                description: "Приложение для поворота картинки в формате bmp",
                                image: "https://i.imgur.com/iePhJOp.png",
                                link: "https://gitlab.se.ifmo.ru/Parzival/assignment-3-image-transform",
                                link_about: "Ссылка на код (gitlab)",
                                tags: ["C"]
                            }
                        ].map((project, index) => (
                            <div key={index} className="portfolio-card">
                                <img src={project.image} alt={project.title} className="portfolio-image"/>
                                <div className="portfolio-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <a className="portfolio-link" href={project.link}>{project.link_about}</a>
                                    <div className="portfolio-tags">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="portfolio-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section">
                <div className="section-container">
                    <h2 className="section-title">Контакты</h2>
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Свяжитесь со мной</h3>
                            {[
                                {icon: MapPin, text: "Санкт-Петербург, Россия"},
                                {icon: Building, text: "ITMO University"}
                            ].map(({icon: Icon, text}, index) => (
                                <div key={index} className="contact-item">
                                    <Icon size={20}/>
                                    <span>{text}</span>
                                </div>
                            ))}
                            <div className="social-links">
                                <a href="https://github.com/petrovviacheslav"><GithubIcon/></a>
                                <a href="https://t.me/chel_ti_w_mute"><Plane/></a>
                                {/*<a href="https://linkedin.com"><Linkedin/></a>*/}
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Имя</label>
                                <input type="text" name={"name"} className="form-input" onChange={handleChange}
                                       value={formData.name}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name={"email"} className="form-input" onChange={handleChange}
                                       value={formData.email}/>
                            </div>
                            <div className="form-group">
                                <label>Сообщение</label>
                                <textarea name={"message"} className="form-textarea" onChange={handleChangeTextarea} placeholder="Type something here..."
                                          value={formData.message}></textarea>
                            </div>
                            <button
                                disabled={formData.name.length === 0 || formData.email.length === 0 || formData.message.length < 2}
                                className="form-button" onClick={handleSubmit}>Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer_about">
                <p>&copy; 2025 Вячеслав Петров. Все права защищены.</p>
            </footer>
        </div>
    );
}

export default About;