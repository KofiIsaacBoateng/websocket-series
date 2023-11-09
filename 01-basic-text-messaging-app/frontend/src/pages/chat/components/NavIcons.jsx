import React from "react";

function NavIcons({ icon, badge, name, active, setActive }) {
  return (
    <div onClick={() => setActive(name)} className="nav-icon">
      <div className="icon-badge">
        {icon}
        {badge && (
          <div className={`badge ${name === "call" ? "call" : ""}`}>
            {badge}
          </div>
        )}
      </div>
      {name === active && <div className="active-indicator"></div>}
    </div>
  );
}

export default NavIcons;
