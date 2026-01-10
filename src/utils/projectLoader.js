// Import all project markdown files
// Using require.context for dynamic imports in Create React App

function importAllProjects() {
    try {
        // This uses webpack's require.context to import all .md files
        const context = require.context('../content/projects', false, /\.md$/);

        const projects = context.keys().map((key) => {
            const content = context(key);
            const slug = key.replace('./', '').replace('.md', '');

            // Parse frontmatter from the markdown content
            const frontmatter = parseFrontmatter(content.default || content);

            return {
                slug,
                ...frontmatter,
                content: getContent(content.default || content),
            };
        });

        return projects.filter(p => p.title); // Only return projects with valid title
    } catch (error) {
        console.warn('Could not load projects from markdown:', error);
        return getDefaultProjects();
    }
}

function parseFrontmatter(markdown) {
    if (typeof markdown !== 'string') return {};

    const match = markdown.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
            try {
                value = JSON.parse(value.replace(/'/g, '"'));
            } catch {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
            }
        }
        // Handle quoted strings
        else if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        // Handle booleans
        else if (value === 'true') value = true;
        else if (value === 'false') value = false;

        frontmatter[key] = value;
    });

    // Map common fields
    return {
        title: frontmatter.title || '',
        shortDescription: frontmatter.description || '',
        technologies: frontmatter.technologies || [],
        githubUrl: frontmatter.githubUrl || '',
        liveUrl: frontmatter.liveUrl || '',
        demoUrl: frontmatter.demoUrl || '',
        coverImage: frontmatter.coverImage || '',
        featured: frontmatter.featured || false,
        challenge: frontmatter.challenge || '',
        solution: frontmatter.solution || '',
        devTime: frontmatter.devTime || '',
        role: frontmatter.role || '',
        battery: frontmatter.battery || '',
        keyLearning: frontmatter.keyLearning || '',
        heroImage: frontmatter.heroImage || '',
        images: frontmatter.images || [],
        badgeType: frontmatter.badgeType || '',
    };
}

function getContent(markdown) {
    if (typeof markdown !== 'string') return '';
    return markdown.replace(/^---\n[\s\S]*?\n---\n*/, '');
}

function getDefaultProjects() {
    return [
        {
            slug: 'code-arena',
            title: 'Code Arena',
            shortDescription: 'A real-time competitive programming platform with WebSocket-based live coding battles.',
            technologies: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
            githubUrl: 'https://github.com/alejandroGM0/code-arena',
            liveUrl: '',
        },
        {
            slug: 'blablacar-clone',
            title: 'BlablaCar Clone',
            shortDescription: 'Full-stack carpooling platform with real-time ride matching and booking system.',
            technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
            githubUrl: 'https://github.com/alejandroGM0',
            liveUrl: '',
        },
        {
            slug: 'spartbot',
            title: 'SpartBot',
            shortDescription: 'Discord bot for server management with moderation tools and custom commands.',
            technologies: ['Python', 'Discord.py', 'MongoDB'],
            githubUrl: 'https://github.com/alejandroGM0',
            liveUrl: '',
        },
    ];
}

export function loadProjects() {
    const projects = importAllProjects();
    return projects.length > 0 ? projects : getDefaultProjects();
}

export default loadProjects;
