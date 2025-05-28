<?php
/**
 * SakuraCloud Maintenance Theme functions and definitions
 *
 * @package SakuraCloudMaintenance
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Enqueue scripts and styles.
 */
function sakuracloud_maintenance_scripts() {
    // Enqueue Three.js
    wp_enqueue_script(
        'threejs',
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        array(),
        '128',
        true
    );

    // Enqueue custom scripts
    wp_enqueue_script(
        'sakuracloud-maintenance-3d',
        get_template_directory_uri() . '/js/warning-icon-3d.js',
        array('threejs'),
        '1.0.0',
        true
    );

    wp_enqueue_script(
        'sakuracloud-maintenance-particles',
        get_template_directory_uri() . '/js/particle-background.js',
        array('threejs'),
        '1.0.0',
        true
    );

    // Enqueue main stylesheet
    wp_enqueue_style(
        'sakuracloud-maintenance-style',
        get_stylesheet_uri(),
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'sakuracloud_maintenance_scripts');

/**
 * Add theme support
 */
function sakuracloud_maintenance_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'sakuracloud_maintenance_setup');

/**
 * Create theme customizer options
 */
function sakuracloud_maintenance_customize_register($wp_customize) {
    // Add section for maintenance mode settings
    $wp_customize->add_section('maintenance_settings', array(
        'title'    => __('Maintenance Mode Settings', 'sakuracloud-maintenance'),
        'priority' => 30,
    ));

    // Add setting for support email
    $wp_customize->add_setting('maintenance_support_email', array(
        'default'           => 'support@sakuracloud.id',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('maintenance_support_email', array(
        'label'    => __('Support Email', 'sakuracloud-maintenance'),
        'section'  => 'maintenance_settings',
        'type'     => 'email',
    ));

    // Add setting for maintenance message
    $wp_customize->add_setting('maintenance_message', array(
        'default'           => "We're mitigating a DDoS attack. Please bear with us.",
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('maintenance_message', array(
        'label'    => __('Maintenance Message', 'sakuracloud-maintenance'),
        'section'  => 'maintenance_settings',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'sakuracloud_maintenance_customize_register');
