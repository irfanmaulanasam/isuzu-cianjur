export function findBreadcrumbTrail(navbarData, pathname) {
  const items = navbarData.navbar.menu;

  const main = items.find(
    (m) => pathname === m.path || pathname.startsWith(m.path + "/")
  );

  if (!main) {
    return [{ title: "Home", path: "/" }];
  }

  const trail = [{ title: "Home", path: "/" }];

  // parent
  trail.push({ title: main.title, path: main.path });

  if (main.submenu) {
    const sub = main.submenu.find(
      (s) => pathname === s.path || pathname.startsWith(s.path + "/")
    );
    if (sub && sub.path !== main.path) {
      // ⬅️ hanya tambahkan jika path beda dengan parent
      trail.push({ title: sub.title, path: sub.path });
    }
  }

  return trail;
}
