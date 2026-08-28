/* @ds-bundle: {"format":4,"namespace":"ShakeDesignSystem_bf929b","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"FAB","sourcePath":"components/actions/FAB.jsx"},{"name":"Icon","sourcePath":"components/actions/Icon.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"SegmentedButton","sourcePath":"components/actions/SegmentedButton.jsx"},{"name":"Badge","sourcePath":"components/communication/Badge.jsx"},{"name":"ProgressIndicator","sourcePath":"components/communication/ProgressIndicator.jsx"},{"name":"Snackbar","sourcePath":"components/communication/Snackbar.jsx"},{"name":"BottomSheet","sourcePath":"components/containment/BottomSheet.jsx"},{"name":"Card","sourcePath":"components/containment/Card.jsx"},{"name":"Dialog","sourcePath":"components/containment/Dialog.jsx"},{"name":"Divider","sourcePath":"components/containment/Divider.jsx"},{"name":"ListItem","sourcePath":"components/containment/ListItem.jsx"},{"name":"NavigationBar","sourcePath":"components/navigation/NavigationBar.jsx"},{"name":"SearchBar","sourcePath":"components/navigation/SearchBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopAppBar","sourcePath":"components/navigation/TopAppBar.jsx"},{"name":"Checkbox","sourcePath":"components/selection/Checkbox.jsx"},{"name":"Chip","sourcePath":"components/selection/Chip.jsx"},{"name":"RadioButton","sourcePath":"components/selection/RadioButton.jsx"},{"name":"Slider","sourcePath":"components/selection/Slider.jsx"},{"name":"Switch","sourcePath":"components/selection/Switch.jsx"},{"name":"Avatar","sourcePath":"components/shake/Avatar.jsx"},{"name":"BeaconControl","sourcePath":"components/shake/BeaconControl.jsx"},{"name":"PersonRow","sourcePath":"components/shake/PersonRow.jsx"},{"name":"SeismicBar","sourcePath":"components/shake/SeismicBar.jsx"},{"name":"StatusChip","sourcePath":"components/shake/StatusChip.jsx"},{"name":"TextField","sourcePath":"components/textinputs/TextField.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"fafad484de7c","components/actions/FAB.jsx":"6919df00ec05","components/actions/Icon.jsx":"9abb6ff7d7c2","components/actions/IconButton.jsx":"f46b5fc5ad63","components/actions/SegmentedButton.jsx":"fee93392b9c6","components/communication/Badge.jsx":"bcf652dd3e32","components/communication/ProgressIndicator.jsx":"193711374dcd","components/communication/Snackbar.jsx":"e5efa0aeb30b","components/containment/BottomSheet.jsx":"03fc9df4c688","components/containment/Card.jsx":"7e3763ab21c7","components/containment/Dialog.jsx":"cc719bec5ff0","components/containment/Divider.jsx":"c1e9edc1502f","components/containment/ListItem.jsx":"e140cd1b56ca","components/navigation/NavigationBar.jsx":"a10a5225f1be","components/navigation/SearchBar.jsx":"7e9b5800fec7","components/navigation/Tabs.jsx":"55c4e321585e","components/navigation/TopAppBar.jsx":"173cc4aace40","components/selection/Checkbox.jsx":"32f3e41330c0","components/selection/Chip.jsx":"d4e7b0fe92c3","components/selection/RadioButton.jsx":"9dff8107d14d","components/selection/Slider.jsx":"4dfeeb912e14","components/selection/Switch.jsx":"1196eddbf164","components/shake/Avatar.jsx":"23917c3b067f","components/shake/BeaconControl.jsx":"f1b4a211ab9d","components/shake/PersonRow.jsx":"f943a8983a30","components/shake/SeismicBar.jsx":"cd24748a4179","components/shake/StatusChip.jsx":"3ecb7ea78acc","components/textinputs/TextField.jsx":"f88fa7f4fb67","ui_kits/shake-app/AlertsScreen.jsx":"fcb640588c45","ui_kits/shake-app/App.jsx":"720f6fae1573","ui_kits/shake-app/BeaconScreen.jsx":"3725adb1d391","ui_kits/shake-app/HomeScreen.jsx":"e771622e096e","ui_kits/shake-app/MeScreen.jsx":"26fbd8046992","ui_kits/shake-app/PersonScreen.jsx":"ddb20fea3fc8","ui_kits/shake-app/ProfileScreen.jsx":"824bf2d9575f","ui_kits/shake-app/ReportScreen.jsx":"266419b03233","ui_kits/shake-app/SearchScreen.jsx":"d04221ea7667","ui_kits/shake-app/data.js":"c81c0d86e7d4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ShakeDesignSystem_bf929b = window.ShakeDesignSystem_bf929b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name = 'help',
  size = 24,
  fill = 0,
  weight = 400,
  grade = 0,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "shake-icon",
    "aria-hidden": "true"
  }, rest, {
    style: {
      fontSize: size,
      width: size,
      height: size,
      color,
      fontVariationSettings: `'FILL' ${fill ? 1 : 0},'wght' ${weight},'GRAD' ${grade},'opsz' ${size}`,
      ...style
    }
  }), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  filled: {
    bg: 'var(--md-primary)',
    fg: 'var(--md-on-primary)',
    bd: 'none',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-1)'
  },
  tonal: {
    bg: 'var(--md-secondary-container)',
    fg: 'var(--md-on-secondary-container)',
    bd: 'none',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-1)'
  },
  elevated: {
    bg: 'var(--md-surface-container-low)',
    fg: 'var(--md-primary)',
    bd: 'none',
    el: 'var(--elevation-1)',
    elh: 'var(--elevation-2)'
  },
  outlined: {
    bg: 'transparent',
    fg: 'var(--md-primary)',
    bd: 'var(--border-w) solid var(--md-outline)',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-0)'
  },
  text: {
    bg: 'transparent',
    fg: 'var(--md-primary)',
    bd: 'none',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-0)'
  },
  danger: {
    bg: 'var(--md-error)',
    fg: 'var(--md-on-error)',
    bd: 'none',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-1)'
  }
};
const H = {
  xs: 32,
  sm: 40,
  md: 40,
  lg: 56
};
function Button({
  variant = 'filled',
  size = 'md',
  icon,
  trailingIcon,
  fullWidth,
  disabled,
  loading,
  children,
  style,
  ...rest
}) {
  const v = V[variant] || V.filled;
  const [h, setH] = React.useState(false),
    [p, setP] = React.useState(false);
  const off = disabled || loading;
  const tall = size === 'lg';
  const layer = off ? 'transparent' : p ? `color-mix(in srgb,${v.fg} 10%,transparent)` : h ? `color-mix(in srgb,${v.fg} 8%,transparent)` : 'transparent';
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: off,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }, rest, {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: H[size],
      padding: variant === 'text' ? '0 12px' : tall ? '0 32px' : icon ? '0 24px 0 16px' : '0 24px',
      width: fullWidth ? '100%' : 'auto',
      background: off ? 'color-mix(in srgb,var(--md-on-surface) 12%,transparent)' : v.bg,
      color: off ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : v.fg,
      border: off ? 'none' : v.bd,
      borderRadius: 'var(--shape-button)',
      font: tall ? 'var(--type-title-medium)' : 'var(--type-label-large)',
      letterSpacing: 'var(--tracking-label-large)',
      boxShadow: off ? 'none' : h ? v.elh : v.el,
      cursor: off ? 'default' : 'pointer',
      transition: 'var(--transition-state)',
      backgroundImage: `linear-gradient(${layer},${layer})`,
      ...style
    }
  }), loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "progress_activity",
    size: 18,
    style: {
      animation: 'shake-spin 1s linear infinite'
    }
  }) : icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : null, children, trailingIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: trailingIcon,
    size: 18
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/FAB.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const C = {
  primary: ['var(--md-primary-container)', 'var(--md-on-primary-container)'],
  surface: ['var(--md-surface-container-high)', 'var(--md-primary)'],
  secondary: ['var(--md-secondary-container)', 'var(--md-on-secondary-container)'],
  tertiary: ['var(--md-tertiary-container)', 'var(--md-on-tertiary-container)'],
  emergency: ['var(--md-error)', 'var(--md-on-error)']
};
function FAB({
  icon = 'add',
  label,
  size = 'md',
  color = 'primary',
  style,
  ...rest
}) {
  const [bg, fg] = C[color] || C.primary;
  const [h, setH] = React.useState(false);
  const d = size === 'small' ? 40 : size === 'large' ? 96 : 56;
  const ext = !!label;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      height: d,
      width: ext ? 'auto' : d,
      minWidth: ext ? 80 : d,
      padding: ext ? '0 20px' : 0,
      background: bg,
      color: fg,
      border: 'none',
      borderRadius: size === 'small' ? 'var(--shape-md)' : size === 'large' ? 'var(--shape-fab-large)' : 'var(--shape-fab)',
      boxShadow: h ? 'var(--elevation-4)' : 'var(--elevation-3)',
      cursor: 'pointer',
      transition: 'var(--transition-state)',
      font: 'var(--type-label-large)',
      letterSpacing: 'var(--tracking-label-large)'
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'large' ? 36 : 24
  }), label);
}
Object.assign(__ds_scope, { FAB });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/FAB.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  standard: ['transparent', 'var(--md-on-surface-variant)'],
  filled: ['var(--md-primary)', 'var(--md-on-primary)'],
  tonal: ['var(--md-secondary-container)', 'var(--md-on-secondary-container)'],
  outlined: ['transparent', 'var(--md-on-surface-variant)']
};
function IconButton({
  icon = 'more_vert',
  label,
  variant = 'standard',
  selected,
  size = 24,
  disabled,
  style,
  ...rest
}) {
  const [bg, fg] = selected && variant === 'standard' ? ['var(--md-primary-container)', 'var(--md-on-primary-container)'] : V[variant] || V.standard;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      flex: '0 0 auto',
      background: bg,
      backgroundImage: h && !disabled ? `linear-gradient(color-mix(in srgb,${fg} 8%,transparent),color-mix(in srgb,${fg} 8%,transparent))` : 'none',
      color: disabled ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : fg,
      border: variant === 'outlined' ? 'var(--border-w) solid var(--md-outline)' : 'none',
      borderRadius: 'var(--shape-full)',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'var(--transition-state)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size,
    fill: selected
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/actions/SegmentedButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedButton({
  options = [],
  value,
  onChange,
  fullWidth = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group"
  }, rest, {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      width: fullWidth ? '100%' : 'auto',
      height: 40,
      border: 'var(--border-w) solid var(--md-outline)',
      borderRadius: 'var(--shape-full)',
      overflow: 'hidden',
      ...style
    }
  }), options.map((o, i) => {
    const on = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange && onChange(o.value),
      style: {
        flex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '0 12px',
        background: on ? 'var(--md-secondary-container)' : 'transparent',
        color: on ? 'var(--md-on-secondary-container)' : 'var(--md-on-surface)',
        border: 'none',
        borderLeft: i ? 'var(--border-w) solid var(--md-outline)' : 'none',
        font: 'var(--type-label-large)',
        letterSpacing: 'var(--tracking-label-large)',
        cursor: 'pointer',
        transition: 'var(--transition-state)'
      }
    }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 18
    }), o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/SegmentedButton.jsx", error: String((e && e.message) || e) }); }

// components/communication/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  count,
  dot,
  max = 99,
  color = 'error',
  style,
  ...rest
}) {
  const c = color === 'error' ? ['var(--md-error)', 'var(--md-on-error)'] : color === 'primary' ? ['var(--md-primary)', 'var(--md-on-primary)'] : ['var(--md-tertiary)', 'var(--md-on-tertiary)'];
  if (dot) return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--shape-full)',
      background: c[0],
      display: 'inline-block',
      ...style
    }
  }));
  const t = typeof count === 'number' && count > max ? `${max}+` : count;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-grid',
      placeItems: 'center',
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      borderRadius: 'var(--shape-full)',
      background: c[0],
      color: c[1],
      font: 'var(--type-label-small)',
      letterSpacing: 'var(--tracking-label-small)',
      ...style
    }
  }), t);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/communication/Badge.jsx", error: String((e && e.message) || e) }); }

// components/communication/ProgressIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressIndicator({
  variant = 'linear',
  value,
  size = 48,
  thickness = 4,
  style,
  ...rest
}) {
  const ind = value == null;
  if (variant === 'circular') return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: 'var(--shape-full)',
      border: `${thickness}px solid var(--md-secondary-container)`,
      borderTopColor: 'var(--md-primary)',
      animation: ind ? 'shake-spin 1.1s linear infinite' : 'none',
      transform: ind ? 'none' : `rotate(${value / 100 * 360}deg)`,
      ...style
    }
  }));
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      position: 'relative',
      display: 'block',
      height: thickness,
      borderRadius: 'var(--shape-full)',
      background: 'var(--md-secondary-container)',
      overflow: 'hidden',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      width: ind ? '40%' : `${value}%`,
      borderRadius: 'var(--shape-full)',
      background: 'var(--md-primary)',
      animation: ind ? 'shake-indeterminate 1.6s var(--ease-standard) infinite' : 'none',
      transition: 'width var(--dur-medium-2) var(--ease-standard)'
    }
  }));
}
Object.assign(__ds_scope, { ProgressIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/communication/ProgressIndicator.jsx", error: String((e && e.message) || e) }); }

// components/communication/Snackbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Snackbar({
  open = true,
  message,
  action,
  onAction,
  onDismiss,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status"
  }, rest, {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 96,
      zIndex: 70,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      minHeight: 48,
      padding: 'var(--space-2) var(--space-2) var(--space-2) var(--space-4)',
      background: 'var(--md-inverse-surface)',
      color: 'var(--md-inverse-on-surface)',
      borderRadius: 'var(--shape-snackbar)',
      boxShadow: 'var(--elevation-3)',
      animation: 'shake-snack-in var(--dur-medium-2) var(--ease-emphasized-decelerate)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--type-body-medium)',
      letterSpacing: 'var(--tracking-body-medium)'
    }
  }, message), action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0 var(--space-2)',
      height: 36,
      color: 'var(--md-inverse-primary)',
      font: 'var(--type-label-large)',
      letterSpacing: 'var(--tracking-label-large)'
    }
  }, action), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 36,
      height: 36,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'inherit'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 20
  })));
}
Object.assign(__ds_scope, { Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/communication/Snackbar.jsx", error: String((e && e.message) || e) }); }

// components/containment/BottomSheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BottomSheet({
  open = true,
  title,
  onDismiss,
  height = 'auto',
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onDismiss,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'color-mix(in srgb,var(--md-scrim) 32%,transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: 'relative',
      width: '100%',
      maxHeight: '88%',
      height,
      background: 'var(--md-surface-container-low)',
      borderRadius: 'var(--shape-sheet)',
      boxShadow: 'var(--elevation-3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      animation: 'shake-sheet-in var(--dur-medium-4) var(--ease-emphasized-decelerate)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-3) 0 var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 4,
      borderRadius: 'var(--shape-full)',
      background: 'color-mix(in srgb,var(--md-on-surface-variant) 40%,transparent)'
    }
  })), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-title-large)',
      letterSpacing: 'var(--tracking-title-large)',
      padding: 'var(--space-2) var(--space-4) var(--space-3)',
      color: 'var(--md-on-surface)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      padding: '0 var(--space-4) var(--space-6)'
    }
  }, children)));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containment/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/containment/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  elevated: {
    bg: 'var(--md-surface-container-low)',
    bd: 'none',
    el: 'var(--elevation-1)',
    elh: 'var(--elevation-2)'
  },
  filled: {
    bg: 'var(--md-surface-container-highest)',
    bd: 'none',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-1)'
  },
  outlined: {
    bg: 'var(--md-surface)',
    bd: 'var(--border-w) solid var(--md-outline-variant)',
    el: 'var(--elevation-0)',
    elh: 'var(--elevation-1)'
  }
};
function Card({
  variant = 'elevated',
  interactive,
  padding = 'var(--space-4)',
  flush,
  children,
  style,
  ...rest
}) {
  const v = V[variant] || V.elevated;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: v.bg,
      border: v.bd,
      borderRadius: 'var(--shape-card)',
      boxShadow: interactive && h ? v.elh : v.el,
      flexShrink: 0,
      padding: flush ? 0 : padding,
      overflow: 'hidden',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'var(--transition-state)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containment/Card.jsx", error: String((e && e.message) || e) }); }

// components/containment/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  icon,
  headline,
  supporting,
  actions,
  onDismiss,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onDismiss,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 60,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-6)',
      background: 'color-mix(in srgb,var(--md-scrim) 32%,transparent)',
      animation: 'shake-fade var(--dur-medium-1) var(--ease-emphasized-decelerate)'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    role: "dialog"
  }, rest, {
    style: {
      width: '100%',
      maxWidth: 360,
      background: 'var(--md-surface-container-high)',
      borderRadius: 'var(--shape-dialog)',
      boxShadow: 'var(--elevation-3)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      alignItems: icon ? 'center' : 'stretch',
      textAlign: icon ? 'center' : 'left',
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    color: "var(--md-secondary)"
  }), headline && /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-headline-small)',
      letterSpacing: 'var(--tracking-headline-small)',
      color: 'var(--md-on-surface)'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-medium)',
      letterSpacing: 'var(--tracking-body-medium)',
      color: 'var(--md-on-surface-variant)',
      textAlign: 'left'
    }
  }, supporting), children, actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-2)'
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containment/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/containment/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Divider({
  inset = 0,
  vertical,
  label,
  style,
  ...rest
}) {
  if (label) return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      margin: 'var(--space-3) 0',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--md-outline-variant)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label-medium)',
      letterSpacing: 'var(--tracking-label-medium)',
      color: 'var(--md-on-surface-variant)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--md-outline-variant)'
    }
  }));
  return /*#__PURE__*/React.createElement("hr", _extends({}, rest, {
    style: vertical ? {
      flexShrink: 0,
      width: 1,
      height: '100%',
      border: 0,
      background: 'var(--md-outline-variant)',
      margin: 0,
      ...style
    } : {
      flexShrink: 0,
      height: 1,
      border: 0,
      background: 'var(--md-outline-variant)',
      margin: 0,
      marginLeft: inset,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containment/Divider.jsx", error: String((e && e.message) || e) }); }

// components/containment/ListItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ListItem({
  leading,
  headline,
  supporting,
  overline,
  trailing,
  trailingIcon,
  lines,
  onClick,
  selected,
  divider,
  style,
  ...rest
}) {
  const n = lines || (supporting ? 2 : 1);
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      display: 'flex',
      alignItems: n > 2 ? 'flex-start' : 'center',
      gap: 'var(--space-4)',
      minHeight: n === 1 ? 'var(--list-item-1line)' : n === 2 ? 'var(--list-item-2line)' : 'var(--list-item-3line)',
      flexShrink: 0,
      padding: 'var(--space-2) var(--space-4)',
      background: selected ? 'var(--md-secondary-container)' : h && onClick ? 'var(--layer-hover-on-surface)' : 'transparent',
      borderBottom: divider ? 'var(--border-w) solid var(--md-outline-variant)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'var(--transition-state)',
      ...style
    }
  }), leading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto'
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, overline && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label-small)',
      letterSpacing: 'var(--tracking-label-small)',
      color: 'var(--md-on-surface-variant)',
      textTransform: 'uppercase'
    }
  }, overline), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      color: 'var(--md-on-surface)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: n > 2 ? 'normal' : 'nowrap'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-medium)',
      letterSpacing: 'var(--tracking-body-medium)',
      color: 'var(--md-on-surface-variant)',
      display: '-webkit-box',
      WebkitLineClamp: n > 2 ? 2 : 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, supporting)), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--type-label-small)',
      letterSpacing: 'var(--tracking-label-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, trailing), trailingIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: trailingIcon,
    size: 24,
    color: "var(--md-on-surface-variant)"
  }));
}
Object.assign(__ds_scope, { ListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/containment/ListItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavigationBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavigationBar({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      display: 'flex',
      flexShrink: 0,
      height: 'var(--nav-bar-h)',
      background: 'var(--md-surface-container)',
      padding: 'var(--space-3) var(--space-2) var(--space-4)',
      ...style
    }
  }), items.map(it => {
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        width: 64,
        height: 32,
        borderRadius: 'var(--shape-full)',
        background: on ? 'var(--md-secondary-container)' : 'transparent',
        transition: 'background-color var(--dur-short-4) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 24,
      fill: on,
      color: on ? 'var(--md-on-secondary-container)' : 'var(--md-on-surface-variant)'
    }), it.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 2,
        right: 14,
        minWidth: 16,
        height: 16,
        padding: '0 4px',
        borderRadius: 'var(--shape-full)',
        background: 'var(--md-error)',
        color: 'var(--md-on-error)',
        font: 'var(--type-label-small)',
        display: 'grid',
        placeItems: 'center'
      }
    }, it.badge) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-label-medium)',
        letterSpacing: 'var(--tracking-label-medium)',
        color: on ? 'var(--md-on-surface)' : 'var(--md-on-surface-variant)',
        fontWeight: on ? 700 : 500
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { NavigationBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavigationBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchBar({
  value = '',
  placeholder = 'Search',
  onChange,
  onSubmit,
  leading = 'search',
  trailing,
  style,
  ...rest
}) {
  const [f2, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      height: 56,
      padding: '0 var(--space-4)',
      background: 'var(--md-surface-container-high)',
      borderRadius: 'var(--shape-full)',
      boxShadow: f2 ? 'var(--elevation-1)' : 'none',
      transition: 'var(--transition-state)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leading,
    size: 24,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    onChange: e => onChange && onChange(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && onSubmit) onSubmit(value);
    },
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--md-on-surface)',
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)'
    }
  }), trailing);
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'primary',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: 'flex',
      flexShrink: 0,
      borderBottom: 'var(--border-w) solid var(--md-outline-variant)',
      background: 'var(--md-surface)',
      ...style
    }
  }), items.map(it => {
    const on = it.value === value;
    const col = on ? variant === 'primary' ? 'var(--md-primary)' : 'var(--md-on-surface)' : 'var(--md-on-surface-variant)';
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      onClick: () => onChange && onChange(it.value),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        height: variant === 'primary' && it.icon ? 64 : 48,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: col,
        position: 'relative',
        padding: '0 var(--space-4)'
      }
    }, it.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 24,
      fill: on
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-title-small)',
        letterSpacing: 'var(--tracking-title-small)',
        whiteSpace: 'nowrap'
      }
    }, it.label), on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: variant === 'primary' ? '50%' : 0,
        transform: variant === 'primary' ? 'translateX(-50%)' : 'none',
        bottom: 0,
        width: variant === 'primary' ? 56 : '100%',
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: 'var(--md-primary)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopAppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopAppBar({
  title,
  subtitle,
  variant = 'small',
  leadingIcon,
  onLeading,
  actions,
  scrolled,
  style,
  ...rest
}) {
  const large = variant === 'large' || variant === 'medium';
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: 'flex',
      flexShrink: 0,
      flexDirection: large ? 'column' : 'row',
      alignItems: large ? 'stretch' : 'center',
      gap: large ? 0 : 'var(--space-1)',
      minHeight: large ? variant === 'large' ? 152 : 112 : 'var(--top-app-bar-h)',
      padding: large ? 0 : '0 var(--space-1)',
      background: scrolled ? 'var(--md-surface-container)' : 'var(--md-surface)',
      transition: 'background-color var(--dur-short-4) var(--ease-standard)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: large ? '0 0 auto' : 1,
      width: '100%',
      alignItems: 'center',
      gap: 'var(--space-1)',
      height: 'var(--top-app-bar-h)',
      padding: large ? '0 var(--space-1)' : 0
    }
  }, leadingIcon && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: leadingIcon,
    label: "Back",
    onClick: onLeading
  }), !large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingLeft: leadingIcon ? 0 : 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-large)',
      letterSpacing: 'var(--tracking-title-large)',
      color: 'var(--md-on-surface)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, subtitle)), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-1)'
    }
  }, actions)), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-4) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: variant === 'large' ? 'var(--type-headline-medium)' : 'var(--type-headline-small)',
      letterSpacing: '0px',
      color: 'var(--md-on-surface)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 4,
      font: 'var(--type-body-medium)',
      letterSpacing: 'var(--tracking-body-medium)',
      color: 'var(--md-on-surface-variant)'
    }
  }, subtitle)));
}
Object.assign(__ds_scope, { TopAppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopAppBar.jsx", error: String((e && e.message) || e) }); }

// components/selection/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  indeterminate,
  onChange,
  disabled,
  label,
  supporting,
  error,
  style,
  ...rest
}) {
  const on = checked || indeterminate;
  const box = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 18,
      height: 18,
      flex: '0 0 auto',
      borderRadius: 2,
      background: on ? error ? 'var(--md-error)' : 'var(--md-primary)' : 'transparent',
      border: on ? 'none' : `2px solid ${error ? 'var(--md-error)' : 'var(--md-on-surface-variant)'}`,
      opacity: disabled ? 0.38 : 1,
      transition: 'var(--transition-state)'
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: indeterminate ? 'remove' : 'check',
    size: 16,
    color: "var(--md-on-primary)"
  }));
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: supporting ? 'flex-start' : 'center',
      gap: 'var(--space-3)',
      minHeight: 'var(--touch-target)',
      cursor: disabled ? 'default' : 'pointer',
      ...style
    },
    onClick: () => !disabled && onChange && onChange(!checked)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 40,
      height: 40,
      flex: '0 0 auto',
      marginLeft: -8
    }
  }, box), label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: supporting ? 10 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      color: disabled ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : 'var(--md-on-surface)'
    }
  }, label), supporting && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, supporting)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/selection/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  label,
  type = 'assist',
  icon,
  avatar,
  selected,
  onRemove,
  onClick,
  disabled,
  style,
  ...rest
}) {
  const sel = selected && (type === 'filter' || type === 'input');
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 32,
      padding: onRemove ? '0 8px 0 12px' : icon || avatar || sel ? '0 16px 0 8px' : '0 16px',
      background: sel ? 'var(--md-secondary-container)' : type === 'suggestion' || type === 'filter' ? 'transparent' : 'var(--md-surface-container-low)',
      backgroundImage: h && !disabled ? 'linear-gradient(var(--layer-hover-on-surface),var(--layer-hover-on-surface))' : 'none',
      color: sel ? 'var(--md-on-secondary-container)' : 'var(--md-on-surface-variant)',
      border: sel ? 'none' : 'var(--border-w) solid var(--md-outline-variant)',
      borderRadius: 'var(--shape-chip)',
      font: 'var(--type-label-large)',
      letterSpacing: 'var(--tracking-label-large)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.38 : 1,
      transition: 'var(--transition-state)',
      whiteSpace: 'nowrap',
      ...style
    }
  }), sel ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 18
  }) : avatar ? avatar : icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : null, label, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 18,
      height: 18
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 18
  })));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Chip.jsx", error: String((e && e.message) || e) }); }

// components/selection/RadioButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function RadioButton({
  checked = false,
  onChange,
  disabled,
  label,
  supporting,
  value,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({}, rest, {
    onClick: () => !disabled && onChange && onChange(value),
    style: {
      display: 'flex',
      alignItems: supporting ? 'flex-start' : 'center',
      gap: 'var(--space-3)',
      minHeight: 'var(--touch-target)',
      cursor: disabled ? 'default' : 'pointer',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 40,
      height: 40,
      flex: '0 0 auto',
      marginLeft: -8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 'var(--shape-full)',
      border: `2px solid ${checked ? 'var(--md-primary)' : 'var(--md-on-surface-variant)'}`,
      opacity: disabled ? 0.38 : 1,
      transition: 'var(--transition-state)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 'var(--shape-full)',
      background: 'var(--md-primary)'
    }
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: supporting ? 9 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      color: 'var(--md-on-surface)'
    }
  }, label), supporting && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, supporting)));
}
Object.assign(__ds_scope, { RadioButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/RadioButton.jsx", error: String((e && e.message) || e) }); }

// components/selection/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  valueLabel,
  disabled,
  style,
  ...rest
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }), (label || valueLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--type-label-large)',
      letterSpacing: 'var(--tracking-label-large)',
      color: 'var(--md-on-surface-variant)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--md-on-surface)'
    }
  }, valueLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'var(--touch-target)',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 16,
      borderRadius: 'var(--shape-full)',
      background: 'var(--md-secondary-container)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `calc(${pct}% - 4px)`,
      height: 16,
      borderRadius: 'var(--shape-full)',
      background: disabled ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : 'var(--md-primary)',
      transition: 'width var(--dur-short-2) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `calc(${pct}% - 2px)`,
      width: 4,
      height: 44,
      borderRadius: 'var(--shape-full)',
      background: disabled ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : 'var(--md-primary)',
      transition: 'left var(--dur-short-2) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    value: value,
    min: min,
    max: max,
    step: step,
    disabled: disabled,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      opacity: 0,
      cursor: disabled ? 'default' : 'pointer',
      margin: 0
    }
  })));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Slider.jsx", error: String((e && e.message) || e) }); }

// components/selection/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  disabled,
  icons = true,
  label,
  style,
  ...rest
}) {
  const sw = /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked)
  }, rest, {
    style: {
      position: 'relative',
      width: 52,
      height: 32,
      flex: '0 0 auto',
      borderRadius: 'var(--shape-full)',
      cursor: disabled ? 'default' : 'pointer',
      background: disabled ? 'color-mix(in srgb,var(--md-on-surface) 12%,transparent)' : checked ? 'var(--md-primary)' : 'var(--md-surface-container-highest)',
      border: checked ? '2px solid transparent' : '2px solid var(--md-outline)',
      padding: 0,
      transition: 'background-color var(--dur-short-4) var(--ease-standard),border-color var(--dur-short-4) var(--ease-standard)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: checked ? 26 : 4,
      transform: 'translateY(-50%)',
      width: checked ? 24 : 16,
      height: checked ? 24 : 16,
      borderRadius: 'var(--shape-full)',
      display: 'grid',
      placeItems: 'center',
      background: checked ? 'var(--md-on-primary)' : 'var(--md-outline)',
      transition: 'left var(--dur-short-4) var(--ease-emphasized),width var(--dur-short-2) var(--ease-standard),height var(--dur-short-2) var(--ease-standard)'
    }
  }, icons && checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    color: "var(--md-primary)"
  })));
  if (!label) return sw;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      minHeight: 'var(--touch-target)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      color: 'var(--md-on-surface)'
    }
  }, label), sw);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Switch.jsx", error: String((e && e.message) || e) }); }

// components/shake/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RING = {
  safe: 'var(--status-safe)',
  missing: 'var(--status-missing)',
  unconfirmed: 'var(--status-unconfirmed)',
  injured: 'var(--status-injured)',
  none: 'transparent'
};
function Avatar({
  name,
  src,
  size = 40,
  status = 'none',
  icon,
  style,
  ...rest
}) {
  const init = (name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const ring = RING[status] || 'transparent';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      position: 'relative',
      display: 'inline-grid',
      placeItems: 'center',
      width: size,
      height: size,
      flex: '0 0 auto',
      borderRadius: 'var(--shape-full)',
      background: src ? 'var(--md-surface-container-highest)' : 'var(--md-secondary-container)',
      color: 'var(--md-on-secondary-container)',
      font: `500 ${Math.round(size * 0.36)}px/1 var(--font-plain)`,
      boxShadow: status !== 'none' ? `0 0 0 2px var(--md-surface),0 0 0 4px ${ring}` : 'none',
      overflow: 'visible',
      ...style
    }
  }), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--shape-full)'
    }
  }) : icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.55)
  }) : init || /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "person",
    size: Math.round(size * 0.55)
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shake/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/shake/BeaconControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MODE = {
  sos: {
    on: 'var(--md-error)',
    fg: 'var(--md-on-error)',
    soft: 'var(--md-error-container)',
    softFg: 'var(--md-on-error-container)',
    icon: 'sos',
    title: 'SOS beacon',
    sub: 'I need help where I am'
  },
  search: {
    on: 'var(--md-primary)',
    fg: 'var(--md-on-primary)',
    soft: 'var(--md-primary-container)',
    softFg: 'var(--md-on-primary-container)',
    icon: 'radar',
    title: 'Search beacon',
    sub: 'I am looking for someone'
  }
};
function BeaconControl({
  mode = 'sos',
  active,
  disabled,
  onActivate,
  onStop,
  size = 200,
  style,
  ...rest
}) {
  const m = MODE[mode] || MODE.sos;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: () => active ? onStop && onStop() : onActivate && onActivate(),
    style: {
      position: 'relative',
      flexShrink: 0,
      width: size,
      height: size,
      borderRadius: 'var(--shape-full)',
      border: 'none',
      padding: 0,
      background: disabled ? 'color-mix(in srgb,var(--md-on-surface) 12%,transparent)' : active ? m.on : m.soft,
      color: disabled ? 'color-mix(in srgb,var(--md-on-surface) 38%,transparent)' : active ? m.fg : m.softFg,
      boxShadow: active ? 'var(--elevation-4)' : 'var(--elevation-1)',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background-color var(--dur-medium-2) var(--ease-emphasized),box-shadow var(--dur-medium-2) var(--ease-emphasized)'
    }
  }, active && [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      inset: -2,
      borderRadius: 'var(--shape-full)',
      border: `2px solid ${m.on}`,
      animation: `shake-ripple 2.4s var(--ease-standard) ${i * 0.8}s infinite`,
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: m.icon,
    size: Math.round(size * 0.3),
    fill: active
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-title-medium)',
      letterSpacing: 'var(--tracking-title-medium)'
    }
  }, active ? 'Broadcasting' : 'Hold to start'))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-large)',
      letterSpacing: 'var(--tracking-title-large)',
      color: 'var(--md-on-surface)'
    }
  }, m.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-medium)',
      letterSpacing: 'var(--tracking-body-medium)',
      color: 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, m.sub)));
}
Object.assign(__ds_scope, { BeaconControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shake/BeaconControl.jsx", error: String((e && e.message) || e) }); }

// components/shake/SeismicBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LV = ['var(--seismic-1)', 'var(--seismic-2)', 'var(--seismic-3)', 'var(--seismic-4)', 'var(--seismic-5)', 'var(--seismic-6)', 'var(--seismic-7)'];
function SeismicBar({
  level = 4,
  place,
  time,
  magnitude,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-3) var(--space-4)',
      background: 'var(--md-error-container)',
      color: 'var(--md-on-error-container)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "crisis_alert",
    size: 24,
    fill: true,
    style: {
      animation: 'shake-pulse 2s var(--ease-standard) infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)',
      letterSpacing: 'var(--tracking-title-small)'
    }
  }, "M", magnitude, " \xB7 ", place), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      opacity: .8
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      alignItems: 'flex-end',
      height: 24
    }
  }, LV.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 5,
      height: 8 + i * 2.6,
      borderRadius: 1,
      background: i < level ? c : 'color-mix(in srgb,currentColor 18%,transparent)'
    }
  }))));
}
Object.assign(__ds_scope, { SeismicBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shake/SeismicBar.jsx", error: String((e && e.message) || e) }); }

// components/shake/StatusChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const S = {
  safe: {
    bg: 'var(--status-safe-container)',
    fg: 'var(--status-on-safe-container)',
    icon: 'check_circle',
    label: 'Safe'
  },
  missing: {
    bg: 'var(--status-missing-container)',
    fg: 'var(--status-on-missing-container)',
    icon: 'help',
    label: 'Missing'
  },
  unconfirmed: {
    bg: 'var(--status-unconfirmed-container)',
    fg: 'var(--status-on-unconfirmed-container)',
    icon: 'schedule',
    label: 'Unconfirmed'
  },
  injured: {
    bg: 'var(--status-injured-container)',
    fg: 'var(--status-on-injured-container)',
    icon: 'personal_injury',
    label: 'Injured'
  },
  searching: {
    bg: 'var(--status-searching-container)',
    fg: 'var(--status-on-searching-container)',
    icon: 'radar',
    label: 'Searching'
  }
};
function StatusChip({
  status = 'unconfirmed',
  label,
  size = 'md',
  style,
  ...rest
}) {
  const s = S[status] || S.unconfirmed;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sm ? 4 : 6,
      height: sm ? 24 : 32,
      padding: sm ? '0 8px 0 6px' : '0 12px 0 8px',
      background: s.bg,
      color: s.fg,
      borderRadius: 'var(--shape-chip)',
      font: sm ? 'var(--type-label-medium)' : 'var(--type-label-large)',
      letterSpacing: sm ? 'var(--tracking-label-medium)' : 'var(--tracking-label-large)',
      whiteSpace: 'nowrap',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s.icon,
    size: sm ? 14 : 18,
    fill: true
  }), label || s.label);
}
Object.assign(__ds_scope, { StatusChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shake/StatusChip.jsx", error: String((e && e.message) || e) }); }

// components/shake/PersonRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PersonRow({
  name,
  status = 'unconfirmed',
  lastSeen,
  distance,
  updated,
  onClick,
  divider = true,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      minHeight: 'var(--list-item-3line)',
      padding: 'var(--space-3) var(--space-4)',
      background: h && onClick ? 'var(--layer-hover-on-surface)' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      borderBottom: divider ? 'var(--border-w) solid var(--md-outline-variant)' : 'none',
      transition: 'var(--transition-state)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      color: 'var(--md-on-surface)',
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), lastSeen && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "location_on",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, lastSeen)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    status: status,
    size: "sm"
  }), updated && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label-medium)',
      letterSpacing: 'var(--tracking-label-medium)',
      color: 'var(--md-on-surface-variant)'
    }
  }, updated))), distance && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label-medium)',
      letterSpacing: 'var(--tracking-label-medium)',
      color: 'var(--md-on-surface-variant)',
      flex: '0 0 auto'
    }
  }, distance));
}
Object.assign(__ds_scope, { PersonRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shake/PersonRow.jsx", error: String((e && e.message) || e) }); }

// components/textinputs/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  variant = 'outlined',
  label,
  value = '',
  placeholder,
  supporting,
  error,
  errorText,
  leadingIcon,
  trailingIcon,
  onTrailing,
  multiline,
  rows = 3,
  disabled,
  onChange,
  style,
  ...rest
}) {
  const [f2, setF] = React.useState(false);
  const active = f2 || !!value || !!placeholder;
  const col = error ? 'var(--md-error)' : f2 ? 'var(--md-primary)' : 'var(--md-on-surface-variant)';
  const outlined = variant === 'outlined';
  const Field = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      gap: 'var(--space-1)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: multiline ? 'flex-start' : 'center',
      gap: 'var(--space-3)',
      minHeight: 56,
      padding: multiline ? 'var(--space-4)' : outlined ? '0 var(--space-4)' : 'var(--space-5) var(--space-4) var(--space-2)',
      background: outlined ? 'transparent' : 'var(--md-surface-container-highest)',
      border: outlined ? `${f2 ? '2px' : '1px'} solid ${error ? 'var(--md-error)' : f2 ? 'var(--md-primary)' : 'var(--md-outline)'}` : 'none',
      borderBottom: outlined ? undefined : `${f2 ? '2px' : '1px'} solid ${col}`,
      borderRadius: outlined ? 'var(--shape-text-field-outlined)' : 'var(--shape-text-field)',
      opacity: disabled ? 0.38 : 1,
      transition: 'var(--transition-state)'
    }
  }, leadingIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: leadingIcon,
    size: 24,
    color: col
  }), label && /*#__PURE__*/React.createElement("label", {
    style: {
      position: 'absolute',
      left: leadingIcon ? 52 : 16,
      pointerEvents: 'none',
      top: active ? outlined ? -8 : 8 : '50%',
      transform: active ? 'none' : 'translateY(-50%)',
      padding: outlined && active ? '0 4px' : 0,
      background: outlined && active ? 'var(--md-surface)' : 'transparent',
      font: active ? 'var(--type-body-small)' : 'var(--type-body-large)',
      letterSpacing: active ? 'var(--tracking-body-small)' : 'var(--tracking-body-large)',
      color: col,
      transition: 'all var(--dur-short-3) var(--ease-standard)'
    }
  }, label), /*#__PURE__*/React.createElement(Field, {
    value: value,
    rows: multiline ? rows : undefined,
    placeholder: f2 || !label ? placeholder : '',
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    onChange: e => onChange && onChange(e.target.value),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      resize: 'none',
      padding: label && !multiline ? '20px 0 6px' : 0,
      color: 'var(--md-on-surface)',
      font: 'var(--type-body-large)',
      letterSpacing: 'var(--tracking-body-large)',
      fontFamily: 'var(--font-plain)'
    }
  }), trailingIcon && /*#__PURE__*/React.createElement("span", {
    onClick: onTrailing,
    style: {
      cursor: onTrailing ? 'pointer' : 'default'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: trailingIcon,
    size: 24,
    color: col
  }))), (supporting || errorText) && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 var(--space-4)',
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: error ? 'var(--md-error)' : 'var(--md-on-surface-variant)'
    }
  }, error ? errorText || supporting : supporting));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/textinputs/TextField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/AlertsScreen.jsx
try { (() => {
const {
  TopAppBar,
  ListItem,
  Icon,
  Avatar,
  Divider,
  Card,
  Button,
  Switch,
  Badge
} = window.ShakeDesignSystem_bf929b;
function AlertsScreen({
  data
}) {
  const tone = {
    error: ['var(--md-error-container)', 'var(--md-on-error-container)'],
    safe: ['var(--status-safe-container)', 'var(--status-on-safe-container)'],
    neutral: ['var(--md-secondary-container)', 'var(--md-on-secondary-container)']
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    variant: "large",
    title: "Alerts",
    subtitle: "Nagoya event \xB7 M6.4"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: 16
    }
  }, data.alerts.map((a, i) => {
    const [bg, fg] = tone[a.tone];
    return /*#__PURE__*/React.createElement(ListItem, {
      key: a.id,
      lines: 3,
      divider: i < data.alerts.length - 1,
      leading: /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'grid',
          placeItems: 'center',
          width: 40,
          height: 40,
          borderRadius: 'var(--shape-full)',
          background: bg,
          color: fg
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: a.icon,
        size: 22,
        fill: true
      })),
      headline: a.title,
      supporting: a.body,
      trailing: /*#__PURE__*/React.createElement("span", null, a.time)
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "filled"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-medium)',
      marginBottom: 4
    }
  }, "Alert settings"), /*#__PURE__*/React.createElement(Switch, {
    label: "Aftershock warnings",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Updates on people I follow",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Shelter capacity changes",
    checked: false,
    onChange: () => {}
  })))));
}
Object.assign(window, {
  AlertsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/AlertsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/App.jsx
try { (() => {
const {
  NavigationBar,
  Snackbar
} = window.ShakeDesignSystem_bf929b;
function PhoneFrame({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 'var(--phone-w)',
      height: 'var(--phone-h)',
      maxHeight: '100%',
      background: 'var(--md-surface)',
      borderRadius: 44,
      boxShadow: 'var(--elevation-5)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '8px solid #111318'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      font: 'var(--type-label-medium)',
      color: 'var(--md-on-surface)',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "04:53"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "shake-icon",
    style: {
      fontSize: 15
    }
  }, "signal_cellular_alt"), /*#__PURE__*/React.createElement("span", {
    className: "shake-icon",
    style: {
      fontSize: 15
    }
  }, "wifi"), /*#__PURE__*/React.createElement("span", {
    className: "shake-icon",
    style: {
      fontSize: 15
    }
  }, "battery_5_bar"))), children);
}
class Boundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      err: null
    };
  }
  static getDerivedStateFromError(err) {
    return {
      err
    };
  }
  render() {
    if (!this.state.err) return this.props.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'grid',
        placeItems: 'center',
        padding: 32,
        textAlign: 'center',
        color: 'var(--md-on-surface-variant)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "shake-icon",
      style: {
        fontSize: 40
      }
    }, "error"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 8,
        font: 'var(--type-body-medium)'
      }
    }, "This screen failed to render.", /*#__PURE__*/React.createElement("br", null), String(this.state.err.message || this.state.err))));
  }
}
function App() {
  const data = window.SHAKE_DATA;
  const [tab, setTab] = React.useState('home');
  const [stack, setStack] = React.useState(null);
  const [eventActive, setEventActive] = React.useState(true);
  const [safe, setSafe] = React.useState(false);
  const [snack, setSnack] = React.useState(null);
  const [people, setPeople] = React.useState(data.people);
  const [granted, setGranted] = React.useState(false);
  const [beaconOn, setBeaconOn] = React.useState(false);
  const [mode, setMode] = React.useState('sos');
  const [profile, setProfile] = React.useState(data.profile);
  const d = {
    ...data,
    people,
    event: {
      ...data.event,
      active: eventActive
    }
  };
  const open = id => setStack({
    screen: 'person',
    id
  });
  const markSafe = id => {
    setPeople(ps => ps.map(p => p.id === id ? {
      ...p,
      status: 'safe',
      updated: 'just now'
    } : p));
    setStack(null);
    setSnack('Record updated — 8 followers notified');
  };
  const pct = Math.round(100 * ['name', 'age', 'blood', 'allergies', 'conditions'].filter(k => profile[k]).length / 5);
  let body;
  if (stack && stack.screen === 'person') {
    const p = people.find(x => x.id === stack.id);
    body = /*#__PURE__*/React.createElement(PersonScreen, {
      person: p,
      onBack: () => setStack(null),
      onMarkSafe: () => markSafe(p.id)
    });
  } else if (stack && stack.screen === 'report') body = /*#__PURE__*/React.createElement(ReportScreen, {
    onBack: () => setStack(null),
    onSubmit: n => {
      setStack(null);
      setSnack('Report for ' + n + ' submitted');
    }
  });else if (stack && stack.screen === 'beacon') body = /*#__PURE__*/React.createElement(BeaconScreen, {
    onBack: () => setStack(null),
    granted: granted,
    onGrant: () => {
      setGranted(true);
      setSnack('Beacon mode allowed');
    },
    profile: profile,
    active: beaconOn,
    mode: mode,
    onMode: setMode,
    onStart: () => {
      setBeaconOn(true);
      setSnack(mode === 'sos' ? 'SOS beacon broadcasting' : 'Search beacon broadcasting');
    },
    onStop: () => {
      setBeaconOn(false);
      setSnack('Beacon stopped');
    }
  });else if (stack && stack.screen === 'profile') body = /*#__PURE__*/React.createElement(ProfileScreen, {
    onBack: () => setStack(null),
    profile: profile,
    onSave: p => {
      setProfile(p);
      setStack(null);
      setSnack('Emergency profile saved');
    }
  });else if (tab === 'home') body = /*#__PURE__*/React.createElement(HomeScreen, {
    data: d,
    eventActive: eventActive,
    onToggleEvent: () => setEventActive(v => !v),
    safe: safe,
    profilePct: pct,
    onSafe: () => {
      setSafe(true);
      setSnack('You are marked safe — 12 contacts notified');
    },
    onBeacon: () => setStack({
      screen: 'beacon'
    }),
    onProfile: () => setStack({
      screen: 'profile'
    }),
    onTest: () => setSnack('Test beacon sent — nobody was alerted'),
    onMap: () => setTab('search')
  });else if (tab === 'search') body = /*#__PURE__*/React.createElement(SearchScreen, {
    data: d,
    onOpen: open
  });else if (tab === 'alerts') body = /*#__PURE__*/React.createElement(AlertsScreen, {
    data: d
  });else body = /*#__PURE__*/React.createElement(MeScreen, {
    safe: safe,
    profile: profile,
    beaconOn: beaconOn,
    onProfile: () => setStack({
      screen: 'profile'
    }),
    onBeacon: () => setStack({
      screen: 'beacon'
    }),
    onSafe: () => {
      setSafe(s => !s);
      setSnack(safe ? 'Status cleared' : 'You are marked safe — 12 contacts notified');
    }
  });
  React.useEffect(() => {
    if (!snack) return;
    const t = setTimeout(() => setSnack(null), 3200);
    return () => clearTimeout(t);
  }, [snack]);
  return /*#__PURE__*/React.createElement(PhoneFrame, null, /*#__PURE__*/React.createElement(Boundary, {
    key: stack && stack.screen || tab
  }, body), !stack && /*#__PURE__*/React.createElement(NavigationBar, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'home',
      label: 'Home',
      icon: 'home'
    }, {
      value: 'search',
      label: 'Search',
      icon: 'person_search'
    }, {
      value: 'alerts',
      label: 'Alerts',
      icon: 'notifications',
      badge: 4
    }, {
      value: 'me',
      label: 'Me',
      icon: 'account_circle'
    }]
  }), /*#__PURE__*/React.createElement(Snackbar, {
    open: !!snack,
    message: snack,
    onDismiss: () => setSnack(null)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/BeaconScreen.jsx
try { (() => {
const DS = window.ShakeDesignSystem_bf929b;
const {
  TopAppBar,
  IconButton,
  BeaconControl,
  SegmentedButton,
  Card,
  Button,
  Icon,
  BottomSheet,
  ListItem,
  Divider,
  Switch,
  StatusChip
} = window.ShakeDesignSystem_bf929b;
function BeaconScreen({
  onBack,
  granted,
  onGrant,
  profile,
  active,
  mode,
  onMode,
  onStart,
  onStop
}) {
  const [ask, setAsk] = React.useState(!granted);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Beacon",
    leadingIcon: "arrow_back",
    onLeading: onBack,
    actions: /*#__PURE__*/React.createElement(IconButton, {
      icon: "help",
      label: "How beacons work"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(SegmentedButton, {
    value: mode,
    onChange: onMode,
    options: [{
      value: 'sos',
      label: 'SOS'
    }, {
      value: 'search',
      label: 'Searching'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement(BeaconControl, {
    mode: mode,
    active: active,
    disabled: !granted,
    onActivate: onStart,
    onStop: onStop
  })), active && /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    style: {
      background: mode === 'sos' ? 'var(--md-error-container)' : 'var(--md-primary-container)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wifi_tethering",
    size: 20,
    fill: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-title-small)'
    }
  }, "Broadcasting for 4 min 12 s")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      marginTop: 6,
      opacity: .85
    }
  }, "Reaching 3 nearby phones over mesh and 1 cell tower. Battery cost so far: 2%.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)',
      color: 'var(--md-on-surface-variant)',
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      margin: '0 4px 8px'
    }
  }, "What your beacon sends"), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true
  }, /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "person",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: profile.name,
    supporting: "Name and age"
  }), /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "bloodtype",
      size: 24,
      color: "var(--md-error)"
    }),
    headline: profile.blood || 'Not set',
    supporting: "Blood type"
  }), /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "allergies",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: profile.allergies || 'None recorded',
    supporting: "Allergies and conditions"
  }), /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "location_on",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "35.1815, 136.9066 \xB7 \xB18 m",
    supporting: "Last known position"
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "battery_5_bar",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "68%",
    supporting: "Battery, so responders know how long you can be reached"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "filled"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-medium)',
      marginBottom: 6
    }
  }, "Beacon settings"), /*#__PURE__*/React.createElement(Switch, {
    label: "Keep broadcasting when screen is off",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Relay other people\u2019s beacons",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Audible pulse every 30 s",
    checked: false,
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement(BottomSheet, {
    open: ask,
    title: "Allow beacon mode?",
    onDismiss: () => setAsk(false)
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-medium)',
      color: 'var(--md-on-surface-variant)',
      marginBottom: 16
    }
  }, "Beacon mode broadcasts your position and emergency profile so responders and nearby phones can find you. It works without a network by relaying through other Shake phones."), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "my_location",
      size: 24,
      color: "var(--md-primary)"
    }),
    headline: "Precise location",
    supporting: "While a beacon is active only",
    lines: 2
  }), /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "bluetooth",
      size: 24,
      color: "var(--md-primary)"
    }),
    headline: "Nearby devices",
    supporting: "To relay over mesh when there is no signal",
    lines: 2
  }), /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "notifications_active",
      size: 24,
      color: "var(--md-primary)"
    }),
    headline: "Background activity",
    supporting: "So the beacon keeps running with the screen off",
    lines: 2
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "badge",
      size: 24,
      color: "var(--md-primary)"
    }),
    headline: "Emergency profile",
    supporting: "Name, age, blood type and allergies",
    lines: 2
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)',
      marginBottom: 16
    }
  }, "Nothing is broadcast until you start a beacon. You can revoke this at any time in Me \u2192 Privacy."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    onClick: () => setAsk(false),
    style: {
      flex: 1
    }
  }, "Not now"), /*#__PURE__*/React.createElement(Button, {
    icon: "check",
    onClick: () => {
      onGrant();
      setAsk(false);
    },
    style: {
      flex: 1.6
    }
  }, "Allow beacon mode"))));
}
Object.assign(window, {
  BeaconScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/BeaconScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/HomeScreen.jsx
try { (() => {
const {
  TopAppBar,
  IconButton,
  Card,
  Button,
  StatusChip,
  Icon,
  Divider,
  ListItem,
  Chip,
  ProgressIndicator,
  Avatar
} = window.ShakeDesignSystem_bf929b;
function Step({
  n,
  icon,
  title,
  body,
  done,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '12px 16px',
      cursor: 'pointer',
      background: done ? 'var(--status-safe-container)' : 'transparent',
      transition: 'background-color var(--dur-short-4) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 32,
      height: 32,
      flex: '0 0 auto',
      borderRadius: 'var(--shape-full)',
      background: done ? 'var(--status-safe)' : 'var(--md-secondary-container)',
      color: done ? '#fff' : 'var(--md-on-secondary-container)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: done ? 'check' : icon,
    size: 18,
    fill: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)',
      letterSpacing: 'var(--tracking-title-small)',
      color: done ? 'var(--status-on-safe-container)' : 'var(--md-on-surface)'
    }
  }, n, ". ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      letterSpacing: 'var(--tracking-body-small)',
      color: done ? 'var(--status-on-safe-container)' : 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, body)));
}
function EventHome({
  data,
  onBeacon,
  onSafe,
  onMap,
  safe
}) {
  const [done, setDone] = React.useState([]);
  const t = i => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i]);
  const steps = [['shield', 'Drop, cover, hold on', 'Stay down until the shaking fully stops. Do not run outside.'], ['health_and_safety', 'Check yourself for injuries', 'Then check anyone within arm’s reach.'], ['check_circle', 'Tell people you are safe', 'One tap notifies your 12 contacts.'], ['door_open', 'Clear your exit route', 'Open the door. Move away from glass and shelves.'], ['water_drop', 'Turn off gas and water', 'Only if you can reach the valve safely.']];
  const missing = data.people.filter(p => p.status === 'missing' || p.status === 'injured').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--md-error-container)',
      color: 'var(--md-on-error-container)',
      padding: '20px 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--type-label-large)',
      letterSpacing: '0.8px',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crisis_alert",
    size: 20,
    fill: true,
    style: {
      animation: 'shake-pulse 2s var(--ease-standard) infinite'
    }
  }), "Earthquake detected \xB7 41 min ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-display-large)',
      letterSpacing: 'var(--tracking-display-large)',
      lineHeight: 1
    }
  }, "M", data.event.magnitude), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-title-medium)'
    }
  }, "Shindo 5+")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-medium)',
      marginTop: 4,
      opacity: .85
    }
  }, data.event.place, " \xB7 ", data.event.time), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      alignItems: 'flex-end',
      height: 28,
      marginTop: 14
    }
  }, [1, 2, 3, 4, 5, 6, 7].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: 8 + i * 3,
      borderRadius: 2,
      background: i <= data.event.level ? `var(--seismic-${i})` : 'color-mix(in srgb,currentColor 18%,transparent)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--type-label-small)',
      letterSpacing: '0.5px',
      marginTop: 6,
      opacity: .75
    }
  }, /*#__PURE__*/React.createElement("span", null, "WEAK"), /*#__PURE__*/React.createElement("span", null, "SEVERE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "check_circle",
    onClick: onSafe,
    disabled: safe,
    style: {
      flex: 1
    }
  }, safe ? 'You are safe' : 'I’m safe'), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "danger",
    icon: "sos",
    onClick: onBeacon,
    style: {
      flex: '0 0 auto',
      padding: '0 22px'
    }
  }, "SOS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 16px 8px',
      font: 'var(--type-title-medium)',
      letterSpacing: 'var(--tracking-title-medium)'
    }
  }, "Do this now"), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true,
    style: {
      margin: '0 16px 16px'
    }
  }, steps.map(([ic, ti, bo], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(Step, {
    n: i + 1,
    icon: ic,
    title: ti,
    body: bo,
    done: done.includes(i),
    onToggle: () => t(i)
  }), i < steps.length - 1 && /*#__PURE__*/React.createElement(Divider, {
    inset: 60
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    interactive: true,
    onClick: onMap,
    style: {
      margin: '0 16px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 'var(--shape-full)',
      background: 'var(--status-missing-container)',
      color: 'var(--status-on-missing-container)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "person_search",
    size: 24,
    fill: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)'
    }
  }, missing, " people unaccounted for near you"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, "Within 5 km \xB7 updated 2 min ago")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 24,
    color: "var(--md-on-surface-variant)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 24px',
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    type: "assist",
    icon: "home_work",
    label: "Nearest shelter \xB7 900 m"
  }), /*#__PURE__*/React.createElement(Chip, {
    type: "assist",
    icon: "water_drop",
    label: "Water points"
  }), /*#__PURE__*/React.createElement(Chip, {
    type: "assist",
    icon: "signal_disconnected",
    label: "Mesh mode on"
  })));
}
function CalmHome({
  data,
  onBeacon,
  onProfile,
  onTest,
  profilePct
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--status-safe-container)',
      color: 'var(--status-on-safe-container)',
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 22,
    fill: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-title-medium)',
      letterSpacing: 'var(--tracking-title-medium)'
    }
  }, "No active seismic events")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      marginTop: 4,
      opacity: .8
    }
  }, "Nagoya \xB7 Naka-ku. Last checked 30 seconds ago.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 8px',
      font: 'var(--type-title-medium)'
    }
  }, "Advisories"), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true,
    style: {
      margin: '0 16px 20px'
    }
  }, /*#__PURE__*/React.createElement(ListItem, {
    lines: 3,
    divider: true,
    leading: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--shape-full)',
        background: 'var(--md-caution-container)',
        color: 'var(--md-on-caution-container)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "warning",
      size: 22,
      fill: true
    })),
    headline: "Aftershock watch \u2014 72 hours",
    supporting: "Elevated probability of M4+ in the Nagoya basin."
  }), /*#__PURE__*/React.createElement(ListItem, {
    lines: 3,
    divider: true,
    leading: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--shape-full)',
        background: 'var(--md-secondary-container)',
        color: 'var(--md-on-secondary-container)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "rainy",
      size: 22,
      fill: true
    })),
    headline: "Heavy rain from 18:00",
    supporting: "Landslide risk on slopes weakened last month."
  }), /*#__PURE__*/React.createElement(ListItem, {
    lines: 3,
    leading: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--shape-full)',
        background: 'var(--md-secondary-container)',
        color: 'var(--md-on-secondary-container)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "campaign",
      size: 22,
      fill: true
    })),
    headline: "City drill \u2014 Thursday 10:00",
    supporting: "A test alert will reach this phone. No action needed."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 8px',
      font: 'var(--type-title-medium)'
    }
  }, "Be ready"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    interactive: true,
    onClick: onProfile
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "badge",
    size: 24,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)'
    }
  }, "Emergency profile ", profilePct, "% complete"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, "Blood type and allergies are missing. Responders read this first.")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 24,
    color: "var(--md-on-surface-variant)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(ProgressIndicator, {
    value: profilePct
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    interactive: true,
    onClick: onTest
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wifi_tethering",
    size: 24,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)'
    }
  }, "Test your beacon"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, "A 30-second silent broadcast. Nobody is alerted.")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 24,
    color: "var(--md-on-surface-variant)"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "backpack",
    size: 24,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)'
    }
  }, "Go-bag checklist"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)',
      marginTop: 2
    }
  }, "7 of 14 items confirmed. Water expires in 3 months.")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 24,
    color: "var(--md-on-surface-variant)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 24px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outlined",
    fullWidth: true,
    icon: "sos",
    onClick: onBeacon
  }, "Open beacon")));
}
function HomeScreen(props) {
  const {
    data,
    eventActive,
    onToggleEvent
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 'var(--top-app-bar-h)',
      padding: '0 4px',
      flexShrink: 0,
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-shield.png",
    alt: "Shake",
    style: {
      height: 30,
      display: 'block',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "bolt",
    label: "Simulate event",
    selected: eventActive,
    onClick: onToggleEvent
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "more_vert",
    label: "More"
  }))), eventActive ? /*#__PURE__*/React.createElement(EventHome, props) : /*#__PURE__*/React.createElement(CalmHome, props));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/MeScreen.jsx
try { (() => {
const {
  TopAppBar,
  Avatar,
  StatusChip,
  Button,
  Card,
  ListItem,
  Icon,
  Switch,
  Divider
} = window.ShakeDesignSystem_bf929b;
function MeScreen({
  safe,
  onSafe,
  profile,
  beaconOn,
  onProfile,
  onBeacon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Me",
    actions: /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 24,
      style: {
        margin: '0 12px',
        color: 'var(--md-on-surface-variant)'
      }
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: safe ? 'filled' : 'elevated',
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '24px 20px',
      background: safe ? 'var(--status-safe-container)' : 'var(--md-surface-container-low)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: profile.name,
    size: 72,
    status: safe ? 'safe' : 'unconfirmed'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-large)'
    }
  }, profile.name), /*#__PURE__*/React.createElement(StatusChip, {
    status: safe ? 'safe' : 'unconfirmed',
    label: safe ? 'Marked safe' : 'Not yet marked'
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-medium)',
      color: safe ? 'var(--status-on-safe-container)' : 'var(--md-on-surface-variant)',
      textAlign: 'center'
    }
  }, safe ? 'Your 12 contacts were notified at 04:31. Update this if your situation changes.' : 'Six people are following your status. One tap tells all of them you are alright.'), !safe && /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    icon: "check_circle",
    onClick: onSafe
  }, "I\u2019m safe"), safe && /*#__PURE__*/React.createElement(Button, {
    variant: "outlined",
    fullWidth: true,
    icon: "edit",
    onClick: onSafe
  }, "Change my status")), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true
  }, /*#__PURE__*/React.createElement(ListItem, {
    onClick: onBeacon,
    divider: true,
    trailingIcon: "chevron_right",
    leading: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 'var(--shape-full)',
        background: beaconOn ? 'var(--md-error-container)' : 'var(--md-secondary-container)',
        color: beaconOn ? 'var(--md-on-error-container)' : 'var(--md-on-secondary-container)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "wifi_tethering",
      size: 22,
      fill: beaconOn
    })),
    headline: "Beacon mode",
    supporting: beaconOn ? 'Broadcasting now' : 'Off · permission required'
  }), /*#__PURE__*/React.createElement(ListItem, {
    onClick: onProfile,
    divider: true,
    trailingIcon: "chevron_right",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "badge",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "Emergency profile",
    supporting: `${profile.blood || 'No blood type'} · ${profile.allergies || 'No allergies recorded'}`
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "group",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "People following me",
    supporting: "12 contacts",
    trailingIcon: "chevron_right",
    divider: true
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "bookmark",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "People I follow",
    supporting: "6 records",
    trailingIcon: "chevron_right",
    divider: true
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "history",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: "My reports",
    supporting: "2 submitted",
    trailingIcon: "chevron_right"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "filled"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-medium)',
      marginBottom: 4
    }
  }, "Privacy"), /*#__PURE__*/React.createElement(Switch, {
    label: "Share location with responders",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Show my phone number on my record",
    checked: false,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Work offline over mesh",
    checked: true,
    onChange: () => {}
  }))));
}
Object.assign(window, {
  MeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/MeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/PersonScreen.jsx
try { (() => {
const {
  TopAppBar,
  IconButton,
  Avatar,
  StatusChip,
  Button,
  Card,
  ListItem,
  Divider,
  Dialog,
  Icon,
  Chip
} = window.ShakeDesignSystem_bf929b;
function PersonScreen({
  person,
  onBack,
  onMarkSafe
}) {
  const [ask, setAsk] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    title: person.name,
    leadingIcon: "arrow_back",
    onLeading: onBack,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "share",
      label: "Share"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "bookmark",
      label: "Follow",
      selected: true
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "more_vert",
      label: "More"
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0 20px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: person.name,
    size: 96,
    status: person.status
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-headline-small)'
    }
  }, person.name), /*#__PURE__*/React.createElement(StatusChip, {
    status: person.status
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, "Age ", person.age, " \xB7 ", person.relation, " \xB7 updated ", person.updated)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tonal",
    icon: "call",
    style: {
      flex: 1
    }
  }, "Call"), /*#__PURE__*/React.createElement(Button, {
    variant: "tonal",
    icon: "directions",
    style: {
      flex: 1
    }
  }, "Route"), /*#__PURE__*/React.createElement(Button, {
    icon: "check_circle",
    onClick: () => setAsk(true),
    style: {
      flex: 1.4
    }
  }, "Found safe")), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "location_on",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: person.lastSeen,
    supporting: "Last confirmed location",
    divider: true
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "call",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: person.phone,
    supporting: "Contact number",
    divider: true
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "fact_check",
      size: 24,
      color: "var(--md-on-surface-variant)"
    }),
    headline: person.reports + ' independent reports',
    supporting: "2 from verified responders"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)',
      color: 'var(--md-on-surface-variant)',
      margin: '0 0 8px 4px',
      textTransform: 'uppercase',
      letterSpacing: '0.8px'
    }
  }, "Timeline"), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true
  }, [['schedule', '04:20 · Left Sakae 3-chome office', 'Reported by a colleague'], ['radar', '05:02 · Phone last on network', 'Cell tower 3 blocks east'], ['person_search', '06:14 · Search team assigned', 'Team 7, Naka-ku sector']].map(([ic, h, s], i) => /*#__PURE__*/React.createElement(ListItem, {
    key: i,
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 24,
      color: "var(--md-primary)"
    }),
    headline: h,
    supporting: s,
    divider: i < 2
  })))), /*#__PURE__*/React.createElement(Dialog, {
    open: ask,
    icon: "check_circle",
    headline: 'Mark ' + person.name.split(' ')[0] + ' as found safe?',
    supporting: "Everyone following this record is notified immediately. You can undo this for five minutes.",
    onDismiss: () => setAsk(false),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "text",
      onClick: () => setAsk(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setAsk(false);
        onMarkSafe();
      }
    }, "Confirm"))
  }));
}
Object.assign(window, {
  PersonScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/PersonScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/ProfileScreen.jsx
try { (() => {
const {
  TopAppBar,
  IconButton,
  TextField,
  Chip,
  Card,
  Button,
  Icon,
  Divider,
  Switch,
  Avatar,
  ListItem
} = window.ShakeDesignSystem_bf929b;
const BLOOD = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
function ProfileScreen({
  onBack,
  profile,
  onSave
}) {
  const [p, setP] = React.useState(profile);
  const set = (k, v) => setP(s => ({
    ...s,
    [k]: v
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Emergency profile",
    leadingIcon: "arrow_back",
    onLeading: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "visibility",
    size: 20,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, "Everything on this page is broadcast by your beacon and shown to responders who find you. Leave out anything you would not want a stranger to read.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 64
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outlined",
    icon: "photo_camera"
  }, "Add a recent photo")), /*#__PURE__*/React.createElement(TextField, {
    label: "Full name",
    value: p.name,
    onChange: v => set('name', v),
    supporting: "As it appears on your ID"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Age",
    value: p.age,
    onChange: v => set('age', v),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Height",
    value: p.height,
    onChange: v => set('height', v),
    style: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-small)',
      color: 'var(--md-on-surface-variant)',
      margin: '0 4px 10px'
    }
  }, "Blood type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, BLOOD.map(b => /*#__PURE__*/React.createElement(Chip, {
    key: b,
    type: "filter",
    label: b,
    selected: p.blood === b,
    onClick: () => set('blood', b)
  })))), /*#__PURE__*/React.createElement(TextField, {
    label: "Allergies",
    value: p.allergies,
    onChange: v => set('allergies', v),
    leadingIcon: "allergies",
    supporting: "Medication, food, latex \u2014 anything a medic must know"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Conditions",
    value: p.conditions,
    onChange: v => set('conditions', v),
    multiline: true,
    rows: 2,
    supporting: "Asthma, diabetes, pacemaker, pregnancy"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Medication you take daily",
    value: p.meds,
    onChange: v => set('meds', v),
    multiline: true,
    rows: 2,
    supporting: "Name and dose, if you know it"
  }), /*#__PURE__*/React.createElement(Divider, {
    label: "Emergency contacts"
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "outlined",
    flush: true
  }, /*#__PURE__*/React.createElement(ListItem, {
    divider: true,
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Hana Kobayashi",
      size: 40
    }),
    headline: "Hana Kobayashi",
    supporting: "Sister \xB7 +81 90 9988 7766",
    trailingIcon: "edit"
  }), /*#__PURE__*/React.createElement(ListItem, {
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Ken Ito",
      size: 40
    }),
    headline: "Ken Ito",
    supporting: "Neighbour \xB7 +81 90 2233 1100",
    trailingIcon: "edit"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outlined",
    fullWidth: true,
    icon: "person_add"
  }, "Add a contact"), /*#__PURE__*/React.createElement(Card, {
    variant: "filled"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-title-medium)',
      marginBottom: 6
    }
  }, "Who can see this"), /*#__PURE__*/React.createElement(Switch, {
    label: "Accredited responders",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Anyone who finds my beacon",
    checked: true,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Show on my public record",
    checked: false,
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    icon: "save",
    onClick: () => onSave(p)
  }, "Save profile")));
}
Object.assign(window, {
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/ReportScreen.jsx
try { (() => {
const {
  TopAppBar,
  IconButton,
  TextField,
  Button,
  RadioButton,
  Checkbox,
  Divider,
  Chip,
  Icon,
  Card
} = window.ShakeDesignSystem_bf929b;
function ReportScreen({
  onBack,
  onSubmit
}) {
  const [name, setName] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [rel, setRel] = React.useState('family');
  const [ok, setOk] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const submit = () => {
    if (!name || !ok) {
      setErr(true);
      return;
    }
    onSubmit(name);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Report someone",
    leadingIcon: "close",
    onLeading: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-medium)',
      color: 'var(--md-on-surface-variant)'
    }
  }, "Tell us who you are looking for. Anything you know helps \u2014 a partial name and an area are enough to start."), /*#__PURE__*/React.createElement(TextField, {
    label: "Full name",
    value: name,
    onChange: v => {
      setName(v);
      setErr(false);
    },
    error: err && !name,
    errorText: "A name or nickname is required",
    supporting: "A nickname is fine if that is all you have"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Last seen",
    value: place,
    onChange: setPlace,
    leadingIcon: "location_on",
    trailingIcon: "my_location",
    supporting: "Nearest cross street or building"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "What they were wearing",
    value: "",
    multiline: true,
    rows: 2,
    supporting: "Colour and type of clothing"
  }), /*#__PURE__*/React.createElement(Divider, {
    label: "Your relationship"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RadioButton, {
    value: "family",
    checked: rel === 'family',
    onChange: setRel,
    label: "Family member"
  }), /*#__PURE__*/React.createElement(RadioButton, {
    value: "friend",
    checked: rel === 'friend',
    onChange: setRel,
    label: "Friend or colleague"
  }), /*#__PURE__*/React.createElement(RadioButton, {
    value: "responder",
    checked: rel === 'responder',
    onChange: setRel,
    label: "Responder",
    supporting: "Reports from responders are marked verified"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "filled",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 20,
    color: "var(--md-on-surface-variant)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-small)',
      color: 'var(--md-on-surface-variant)'
    }
  }, "Reports are visible to anyone searching this event, and to accredited responders. Contact details stay hidden until you allow them.")), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I confirm this report is accurate",
    supporting: "False reports slow responders down",
    checked: ok,
    error: err && !ok,
    onChange: v => {
      setOk(v);
      setErr(false);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    icon: "send",
    onClick: submit
  }, "Submit report")));
}
Object.assign(window, {
  ReportScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/ReportScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/SearchScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  TopAppBar,
  SearchBar,
  IconButton,
  Tabs,
  PersonRow,
  ListItem,
  Icon,
  Chip,
  Divider,
  SegmentedButton,
  Avatar
} = window.ShakeDesignSystem_bf929b;
function SearchScreen({
  data,
  onOpen
}) {
  const [q, setQ] = React.useState('');
  const [tab, setTab] = React.useState('people');
  const [seg, setSeg] = React.useState('all');
  const people = data.people.filter(p => (seg === 'all' || p.status === seg) && p.name.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--md-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 8px'
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    value: q,
    onChange: setQ,
    placeholder: "Name, phone or last-seen area",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "mic",
      label: "Voice search"
    })
  })), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'people',
      label: 'People'
    }, {
      value: 'shelters',
      label: 'Shelters'
    }]
  }), tab === 'people' ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement(SegmentedButton, {
    value: seg,
    onChange: setSeg,
    options: [{
      value: 'all',
      label: 'All'
    }, {
      value: 'missing',
      label: 'Missing'
    }, {
      value: 'safe',
      label: 'Safe'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 4px',
      font: 'var(--type-label-medium)',
      letterSpacing: 'var(--tracking-label-medium)',
      color: 'var(--md-on-surface-variant)'
    }
  }, people.length, " RECORDS \xB7 SORTED BY DISTANCE"), people.map((p, i) => /*#__PURE__*/React.createElement(PersonRow, _extends({
    key: p.id
  }, p, {
    divider: i < people.length - 1,
    onClick: () => onOpen(p.id)
  }))), !people.length && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 24px',
      textAlign: 'center',
      color: 'var(--md-on-surface-variant)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "person_search",
    size: 40
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      font: 'var(--type-body-medium)'
    }
  }, "No records match \u201C", q, "\u201D."))) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, data.shelters.map((s, i) => /*#__PURE__*/React.createElement(ListItem, {
    key: s.id,
    divider: i < data.shelters.length - 1,
    leading: /*#__PURE__*/React.createElement(Avatar, {
      icon: "home_work",
      size: 40
    }),
    headline: s.name,
    supporting: s.open ? `Open · ${s.capacity}` : 'At capacity',
    trailing: /*#__PURE__*/React.createElement("span", null, s.distance),
    trailingIcon: "chevron_right"
  }))));
}
Object.assign(window, {
  SearchScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/SearchScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shake-app/data.js
try { (() => {
window.SHAKE_DATA = {
  profile: {
    name: 'Yuki Nakamura',
    age: '31',
    height: '168 cm',
    blood: '',
    allergies: '',
    conditions: 'Asthma — inhaler in left jacket pocket',
    meds: ''
  },
  event: {
    magnitude: '6.4',
    place: '12 km NE of Nagoya',
    time: 'Today 04:12 JST',
    level: 5
  },
  people: [{
    id: 'p1',
    name: 'Mei Tanaka',
    status: 'missing',
    lastSeen: 'Sakae 3-chome, Naka-ku',
    updated: '8 min ago',
    distance: '1.2 km',
    age: 34,
    relation: 'Colleague',
    phone: '+81 90 1234 5678',
    reports: 3,
    x: 38,
    y: 44
  }, {
    id: 'p2',
    name: 'Ken Ito',
    status: 'safe',
    lastSeen: 'Higashi-ku evacuation centre',
    updated: 'just now',
    distance: '3.8 km',
    age: 52,
    relation: 'Neighbour',
    phone: '+81 90 2233 1100',
    reports: 1,
    x: 62,
    y: 30
  }, {
    id: 'p3',
    name: 'Aya Sato',
    status: 'unconfirmed',
    lastSeen: 'Osu shopping arcade',
    updated: '22 min ago',
    distance: '2.4 km',
    age: 19,
    relation: 'Student',
    phone: '—',
    reports: 2,
    x: 48,
    y: 66
  }, {
    id: 'p4',
    name: 'Riku Mori',
    status: 'injured',
    lastSeen: 'Tsurumai Park first-aid point',
    updated: '41 min ago',
    distance: '900 m',
    age: 27,
    relation: 'Family',
    phone: '+81 80 4455 6677',
    reports: 5,
    x: 26,
    y: 58
  }, {
    id: 'p5',
    name: 'Hana Kobayashi',
    status: 'safe',
    lastSeen: 'Marunouchi station concourse',
    updated: '1 hr ago',
    distance: '4.1 km',
    age: 41,
    relation: 'Family',
    phone: '+81 90 9988 7766',
    reports: 2,
    x: 72,
    y: 52
  }, {
    id: 'p6',
    name: 'Sora Yamada',
    status: 'missing',
    lastSeen: 'Nishiki 2-chome',
    updated: '1 hr ago',
    distance: '1.9 km',
    age: 8,
    relation: 'Family',
    phone: '—',
    reports: 4,
    x: 54,
    y: 22
  }],
  alerts: [{
    id: 'a1',
    icon: 'crisis_alert',
    title: 'Aftershock M4.8',
    body: 'Naka-ku. No new structural damage reported.',
    time: '12 min ago',
    tone: 'error'
  }, {
    id: 'a2',
    icon: 'check_circle',
    title: 'Ken Ito marked safe',
    body: 'Confirmed by a responder at Higashi-ku evacuation centre.',
    time: '32 min ago',
    tone: 'safe'
  }, {
    id: 'a3',
    icon: 'home_work',
    title: 'Shelter opened — Tsurumai Park',
    body: 'Capacity 400. Water and blankets available.',
    time: '1 hr ago',
    tone: 'neutral'
  }, {
    id: 'a4',
    icon: 'person_search',
    title: 'New report near you',
    body: 'Sora Yamada, 8, last seen Nishiki 2-chome.',
    time: '1 hr ago',
    tone: 'neutral'
  }],
  shelters: [{
    id: 's1',
    name: 'Tsurumai Park Centre',
    capacity: '214 / 400',
    distance: '900 m',
    open: true
  }, {
    id: 's2',
    name: 'Higashi-ku Community Hall',
    capacity: '388 / 400',
    distance: '3.8 km',
    open: true
  }, {
    id: 's3',
    name: 'Marunouchi Primary School',
    capacity: 'Full',
    distance: '4.6 km',
    open: false
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shake-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FAB = __ds_scope.FAB;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedButton = __ds_scope.SegmentedButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressIndicator = __ds_scope.ProgressIndicator;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.NavigationBar = __ds_scope.NavigationBar;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopAppBar = __ds_scope.TopAppBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.RadioButton = __ds_scope.RadioButton;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.BeaconControl = __ds_scope.BeaconControl;

__ds_ns.PersonRow = __ds_scope.PersonRow;

__ds_ns.SeismicBar = __ds_scope.SeismicBar;

__ds_ns.StatusChip = __ds_scope.StatusChip;

__ds_ns.TextField = __ds_scope.TextField;

})();
