// Project data loader
export const loadProjects = () => {
  return [
    {
      slug: 'groomusic',
      title: 'GrooMusic',
      shortDescription: 'Create private or public rooms to listen to music synchronously with other people.',
      description: 'This website allows you to create private or public rooms to listen to music synchronously with other people, you can modify the permissions of each member or include your room elsewhere with the API.',
      technologies: ['React', 'Node.js', 'WebSockets'],
      demoUrl: 'http://groomusic.xyz/',
      codeUrl: '#',
    },
    {
      slug: 'spartbot',
      title: 'SpartBot',
      shortDescription: 'A management application for companies and communities with Discord/Telegram integrations.',
      description: 'A management application for companies and communities, this tool allows moderation, ticket management and customer protection, it also has multiple integrations with Discord, Telegram, Slack and others.',
      technologies: ['Python', 'Discord.py', 'PostgreSQL'],
      demoUrl: 'http://spartbot.xyz/',
      codeUrl: '#',
    },
    {
      slug: 'pc-tracker',
      title: 'PC Tracker',
      shortDescription: 'Application for unique PC identification in a discrete way for remote testing.',
      description: 'An application intended for the unique identification of a PC in a discrete way without the user\'s knowledge, currently this application is used to perform tests remotely.',
      technologies: ['Python', 'Flask', 'SQLite'],
      demoUrl: '#',
      codeUrl: '#',
    }
  ];
};

export default loadProjects;
