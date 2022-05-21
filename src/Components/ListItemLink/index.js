import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ListItemText, ListItemIcon, ListItem } from "../../mui";

function ListItemLink(props) {
  const { icon, primary, to, button, disabled } = props;

  let user;
  const userString = localStorage.getItem("minicastUser");
    if (userString) {
      user = JSON.parse(userString);
    }

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button={button} component={renderLink} disabled={disabled} >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default ListItemLink;
