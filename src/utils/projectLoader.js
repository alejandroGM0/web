// Project loader using fetch to load markdown from public folder

const PROJECT_SLUGS = ['entity-swarm', 'drone-delivery', 'blablacar-clone', 'spartbot'];

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

    // Normalize line endings
    const normalizedMarkdown = markdown.replace(/\r\n/g, '\n');
    const match = normalizedMarkdown.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split('\n');

    let currentKey = null;
    let buffer = '';
    let inArray = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Handle Multi-line Array accumulation
        if (inArray) {
            buffer += ' ' + line.trim();
            // Check for end of array (naive: ends with bracket)
            if (line.trim().endsWith(']')) {
                try {
                    // Use Function to parse JS-like object syntax (e.g. { icon: '...' })
                    // This handles unquoted keys which JSON.parse rejects
                    const parsed = new Function('return ' + buffer)();
                    frontmatter[currentKey] = parsed;
                } catch (e) {
                    console.warn('Error parsing frontmatter array:', buffer, e);
                    frontmatter[currentKey] = [];
                }
                inArray = false;
                buffer = '';
            }
            continue;
        }

        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Start of Array detection
        if (value.startsWith('[')) {
            if (value.endsWith(']')) {
                // Single line array
                try {
                    frontmatter[key] = new Function('return ' + value)();
                } catch (e) {
                    // Fallback for simple string lists
                    frontmatter[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
                }
            } else {
                // Multi-line array start
                inArray = true;
                currentKey = key;
                buffer = value;
            }
        }
        // Quoted strings
        else if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            frontmatter[key] = value.slice(1, -1);
        }
        // Booleans
        else if (value === 'true') frontmatter[key] = true;
        else if (value === 'false') frontmatter[key] = false;
        // Numbers
        else if (!isNaN(value) && value !== '') frontmatter[key] = Number(value);
        // Simple string
        else frontmatter[key] = value;
    }

    // Map common fields and INCLUDE NEW ONES
    return {
        title: frontmatter.title || '',
        description: frontmatter.description || '', // Original description
        shortDescription: frontmatter.description || '', // Mapped for compatibility
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
        status: frontmatter.status || '',
        releaseDate: frontmatter.releaseDate || '',
        announcementDate: frontmatter.announcementDate || '',
        // NEW FIELDS
        features: frontmatter.features || [],
        solutionFeatures: frontmatter.solutionFeatures || [],
        codeSnippets: frontmatter.codeSnippets || []
    };
}

function getContent(markdown) {
    if (typeof markdown !== 'string') return '';
    const normalized = markdown.replace(/\r\n/g, '\n');
    return normalized.replace(/^---\n[\s\S]*?\n---\n*/, '');
}

function getDefaultProjects() {
    return [
        {
            slug: 'drone-delivery',
            title: 'Drone Delivery Network',
            shortDescription: 'Autonomous fleet management system for last-mile logistics with real-time 3D visualization.',
            technologies: ['React', 'Node.js', 'Three.js', 'WebSockets'],
            githubUrl: '#',
            liveUrl: '',
        },
        {
            slug: 'blablacar-clone',
            title: 'BlablaCar Clone',
            shortDescription: 'Full-stack carpooling platform with real-time ride matching and booking system.',
            technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
            githubUrl: 'https://github.com/alejandroGM0',
            liveUrl: '',
            features: []
        },
        {
            slug: 'spartbot',
            title: 'SpartBot',
            shortDescription: 'Discord bot for server management with moderation tools and custom commands.',
            technologies: ['Python', 'Discord.py', 'MongoDB'],
            githubUrl: 'https://github.com/alejandroGM0',
            liveUrl: '',
            features: []
        },
    ];
}

// Synchronous export for backwards compatibility
export function loadProjects() {
    return getDefaultProjects();
}

export default loadProjectsAsync;
