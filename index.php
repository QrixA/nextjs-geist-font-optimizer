<?php
/**
 * SakuraCloud Maintenance Mode Theme
 *
 * @package SakuraCloudMaintenance
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?> - Under Maintenance</title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="maintenance-container">
        <div id="particle-background"></div>
        
        <div class="content-wrapper">
            <!-- Logo -->
            <div class="logo glassmorphism">
                <?php
                if (has_custom_logo()) {
                    the_custom_logo();
                } else {
                    echo '<h1>' . get_bloginfo('name') . '</h1>';
                }
                ?>
            </div>

            <!-- Warning Banner -->
            <div class="glowing-banner">
                UNDER ATTACK
            </div>

            <!-- 3D Warning Icon Container -->
            <div id="warning-icon-3d"></div>

            <!-- Status Message -->
            <p class="status-message">
                We're mitigating a DDoS attack. Please bear with us.
            </p>

            <!-- Loading Spinner -->
            <div class="loader"></div>

            <!-- Support Info -->
            <div class="support-info">
                Need help? Email us at <a href="mailto:support@sakuracloud.id">support@sakuracloud.id</a>
            </div>
        </div>
    </div>
    <?php wp_footer(); ?>
</body>
</html>
