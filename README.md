# SakuraCloud Maintenance Theme

A modern, 3D animated maintenance mode theme for WordPress, designed specifically for displaying DDoS attack mitigation status. Features a dynamic 3D warning icon, particle effects, and a professional dark mode interface.

## Features

- Responsive design that works on all devices
- 3D animated warning icon using Three.js
- Dynamic particle background simulating network traffic
- Glassmorphism effects for modern UI
- Customizable maintenance message and support email
- Dark mode with red and neon blue accent colors
- Professional typography using Google Fonts (Inter and Orbitron)
- Fully compatible with WordPress customizer

## Installation

1. Download the theme files
2. Upload the theme folder to `/wp-content/themes/` directory
3. Activate the theme through the 'Themes' menu in WordPress
4. Customize the maintenance message and support email through WordPress Customizer

## Customization

You can customize the following through WordPress Customizer:

1. Logo - Upload your custom logo through the 'Site Identity' section
2. Support Email - Change the support email address
3. Maintenance Message - Modify the main status message

## Requirements

- WordPress 5.0 or higher
- Modern browser with WebGL support (for 3D effects)
- PHP 7.4 or higher

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: The 3D effects require WebGL support. On browsers without WebGL, the theme will fallback to static elements.

## Development

### File Structure

```
sakuracloud-maintenance/
├── index.php           # Main template file
├── style.css          # Theme styles
├── functions.php      # Theme functions and customizer settings
├── screenshot.png     # Theme preview image
├── js/
│   ├── warning-icon-3d.js     # 3D warning icon animation
│   └── particle-background.js  # Background particle effects
└── README.md         # Theme documentation
```

### Building from Source

1. Clone the repository
2. Install dependencies (if any)
3. Make your modifications
4. Test thoroughly across different devices and browsers

## Credits

- Three.js for 3D graphics
- Google Fonts (Inter and Orbitron)
- WordPress Theme Development Team

## License

GNU General Public License v2 or later
