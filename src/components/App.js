import React from 'react';
import '../styled/reset.css'
import '../styled/theme.css'
import OwnLip from './OwnLip'
import Layout from './Layout';
import WorldLip from './WorldLip';
import './App.css'

const routes = {
  OWNLIP: {
    component: OwnLip,
    path: "/"
  },
  WORLDLIP: {
    component: WorldLip,
    path: '/world-lip'
  }
}


function App() {
  const [globalRoute, setGlobalRoute] = React.useState(routes.OWNLIP.path)

  // eslint-disable-next-line
  let displayComponent = Object.keys(routes).map((key) => {
    if (routes[key].path === globalRoute) {
      return <Layout key={Math.random()} Component={routes[key].component} setGlobalRoute={setGlobalRoute} />
    }
  })

  return (
    <main>
      {displayComponent}
    </main>
  );
}

export default App;
