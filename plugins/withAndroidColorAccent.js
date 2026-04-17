const { withAndroidStyles } = require('@expo/config-plugins');

/**
 * Expo Config Plugin to override the colorAccent in Android styles.xml.
 * This ensures that native UI components (like the DatePicker) use the app's primary pink color.
 */
module.exports = function withAndroidColorAccent(config) {
  return withAndroidStyles(config, (config) => {
    config.modResults.resources.style = config.modResults.resources.style.map((style) => {
      // Modify the main AppTheme
      if (style.$.name === 'AppTheme') {
        const hasColorAccent = style.item.find((item) => item.$.name === 'colorAccent');
        
        if (hasColorAccent) {
          hasColorAccent._ = '#ea4063'; // COLORS.primary
        } else {
          style.item.push({ $: { name: 'colorAccent' }, _: '#ea4063' });
        }
      }
      return style;
    });
    
    return config;
  });
};
