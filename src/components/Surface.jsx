import { forwardRef } from 'react';

// The one reusable solid surface every floating element is built from — header, footer,
// buttons, dropdown panels, the mobile nav/filter sheets, the quiz panel. Opaque
// wood-toned background + hairline border + a real drop shadow (see Surface.scss); no
// translucency of any kind. The `__content` wrapper stays so consumers keep a single hook
// for padding/layout that's independent of the shell's shape/shadow.
//
// Modifiers (class names on `className`):
//   surface--cta    oak-filled primary action (buttons/links)
//   surface--icon   square icon button (slider arrows)
//   surface--calm   large structural pane — no hover lift (header, footer, forms, panels)
//   surface--veil   always-mounted panel toggled with .is-open (mobile nav, filter sheet)
//   surface--peel   popover mounted on open / .is-closing before unmount (dropdowns)
const Surface = forwardRef(function Surface(
  { as: Tag = 'div', className = '', contentClassName = '', children, ...rest },
  ref
) {
  return (
    <Tag ref={ref} className={`surface ${className}`} {...rest}>
      <span className={`surface__content ${contentClassName}`}>{children}</span>
    </Tag>
  );
});

export default Surface;
