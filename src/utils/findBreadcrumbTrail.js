export function findBreadcrumbTrail(navbarData, pathname, language) {
  const items = navbarData.navbar.menu;

  const main = items.find(
    (m) => pathname === m.path || pathname.startsWith(m.path + "/")
  );

  if (!main) {
    return [
      {
        title: language === "en" ? "Home" : "Beranda",
        path: "/",
      },
    ];
  }

  const trail = [
    {
      title: language === "en" ? "Home" : "Beranda",
      path: "/",
    },
  ];

  // parent News
  trail.push({ title: main.title, path: main.path });

  // submenu: Promo, Article, Event
  if (main.submenu) {
    const sub = main.submenu.find(
      (s) => pathname === s.path || pathname.startsWith(s.path + "/")
      // penting: pakai startsWith, bukan cuma ===
    );

    if (sub && sub.path !== main.path) {
      trail.push({ title: sub.title, path: sub.path });
    }
  }

  return trail;
}

// export function findBreadcrumbTrail(navbarData, pathname, language) {
//   const items = navbarData.navbar.menu;

//   const main = items.find(
//     (m) => pathname === m.path || pathname.startsWith(m.path + "/")
//   );

//   if (!main) {
//     return [{ title: language ==='en'? "Home":"Beranda", path: "/" }];
//   }
//   const trail =[
//     {title: language === 'en'? 'Home':'Beranda',
//       path:'/'
//     }
//   ]
//   // parent
//   trail.push({ title: main.title, path: main.path });

//   if (main.submenu) {
//     const sub = main.submenu.find(
//       (s) => pathname === s.path || pathname.startsWith(s.path + "/")
//     );
//     if (sub && sub.path !== main.path) {
//       trail.push({ title: sub.title, path: sub.path });
//     }
//   }

//   return trail;
// }
