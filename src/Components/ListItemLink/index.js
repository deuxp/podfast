import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ListItemText, ListItemIcon, ListItem } from "../../mui";

function ListItemLink(props) {
  const { icon, primary, to, button } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button={button} component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
