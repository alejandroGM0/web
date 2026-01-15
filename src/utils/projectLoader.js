// Project loader using fetch to load markdown from public folder

const PROJECT_SLUGS = ['entity-swarm', 'code-arena', 'blablacar-clone', 'spartbot'];

/**
 * Load all projects asynchronously from public folder
 */
export async function loadProjectsAsync() {
    try {
        const projects = await Promise.all(
            PROJECT_SLUGS.map(async (slug) => {
                try {
                    // Use process.env.PUBLIC_URL for correct path in production
                    const basePath = process.env.PUBLIC_URL || '';
                    const response = await fetch(`${basePath}/content/projects/${slug}.md`);

                    if (!response.ok) {
                        console.warn(`Failed to load ${slug}: ${response.status}`);
                        return null;
                    }

                    const markdown = await response.text();
                    const frontmatter = parseFrontmatter(markdown);

                    console.log('Loaded project:', slug, '| Title:', frontmatter.title);

                    return {
                        slug,
                        ...frontmatter,
                        content: getContent(markdown),
                    };
                } catch (err) {
                    console.warn(`Error loading ${slug}:`, err);
                    return null;
                }
            })
        );

        const validProjects = projects.filter(p => p && p.title);
        console.log('Total projects loaded:', validProjects.length);

        return validProjects.length > 0 ? validProjects : getDefaultProjects();
    } catch (error) {
        console.warn('Could not load projects:', error);
        return getDefaultProjects();
    }
}

function parseFrontmatter(markdown) {
    if (typeof markdown !== 'string') return {};

    // Normalize line endings (handle both \r\n and \n)
    const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');

    const match = normalizedMarkdown.match(/^---\n([\s\S]*?)\n---/);
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
        // New fields for in-development projects
        status: frontmatter.status || '',
        releaseDate: frontmatter.releaseDate || '',
        announcementDate: frontmatter.announcementDate || '',
    };
}

function getContent(markdown) {
    if (typeof markdown !== 'string') return '';
    // Normalize line endings (handle both \r\n and \n)
    const normalized = markdown.replace(/\r\n/g, '\n');
    return normalized.replace(/^---\n[\s\S]*?\n---\n*/, '');
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

// Synchronous export for backwards compatibility (returns default projects)
export function loadProjects() {
    return getDefaultProjects();
}

export default loadProjectsAsync;
