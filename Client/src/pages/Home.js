import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useMemo, useState } from "react";
import "./Home.css";
import Covid from "../services/Covid";
import SubCount from "../services/SubCount";
import Temperature from "../services/Temperature";
import LastVideo from "../services/LastVideo";
import MoneyConverter from "../services/MoneyConverter";
import { Switch } from "@progress/kendo-react-inputs";
import Spotify from "../services/Spotify";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const initialPositions = [
  {
    widgetId: "1",
    col: 1,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    widgetId: "2",
    col: 2,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    widgetId: "3",
    col: 3,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    widgetId: "4",
    col: 3,
    colSpan: 2,
    rowSpan: 3,
  },
  {
    widgetId: "5",
    col: 1,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    widgetId: "6",
    col: 2,
    colSpan: 1,
    rowSpan: 2,
  },
];

const getPositions = initialPositions => {
  return (
    JSON.parse(localStorage.getItem("dashboard-positions")) || initialPositions
  );
};

const widgetsConfig = [
  {
    id: "1",
    header: "Temperature",
    body: <Temperature />,
    active: true,
  },
  {
    id: "2",
    header: "Covid Tracker",
    body: <Covid />,
    active: true,
  },
  {
    id: "3",
    header: "Money converter",
    body: <MoneyConverter />,
    active: true,
  },
  {
    id: "4",
    header: "Spotify",
    body: <Spotify />,
    active: true,
  },
  {
    id: "5",
    header: "Sub count",
    body: <SubCount />,
    active: true,
  },
  {
    id: "6",
    header: "Last Video",
    body: <LastVideo />,
    active: true,
  },
];
var uid = 7;

function Home() {
  const [positions, setPositions] = useState(getPositions(initialPositions));
  const [widgets, setWidgets] = useState(widgetsConfig);

  function handleAdd(hd, bdy, act, iD, Cl, Cls, Rws) {
    const newListwd = widgets.concat({ header: hd, id: iD, body: bdy, active: act });
    const newListpos = positions.concat({ widgetId: iD, col: Cl, colSpan: Cls, rowSpan: Rws });
    uid = uid + 1;
    setWidgets(newListwd);
    setPositions(newListpos);
  }

  // Ca sert à filtrer les widgets inactifs
  const activeWidgets = useMemo(() => {
    return widgets.reduce((acc, widget) => {
      if (!widget.active) return acc;
      // si widget actif alors, ajouter
      acc.push(widget);
      return acc;
    }, []);
  }, [widgets]);


  // Récupère les positions uniquement pour les widgets actifs
  // position.widgetId pour obtenir uniquement les widgets actifs
  const filteredPositions = useMemo(() => {
    return positions.filter(position => {
      // Trouver un widget correspondant en utilisant l'identifiant dans
      // l'identifiant de position et renvoyer sa valeur active
      return activeWidgets.find(widget => widget.id === position.widgetId)
        ?.active;
    });
  }, [activeWidgets, positions]);

  const handleReposition = e => {
    setPositions(e.value);
    localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
  };

  const onResetLayout = () => {
    setPositions(initialPositions);
    localStorage.setItem(
      "dashboard-positions",
      JSON.stringify(initialPositions)
    );
  };

  const onToggleWidget = e => {
    const { id } = e.target.props;
    const { value } = e.target;
    const updatedWidgets = widgets.map(widget => {
      if (widget.id === id) {
        return {
          ...widget,
          active: value,
        };
      }
      return widget;
    });

    setWidgets(updatedWidgets);
  };

  return (
    <div className="Home">
      <header className="Home-header"></header>
      <div className="k-display-flex">
        <TileLayout
          columns={4}
          rowHeight={255}
          positions={filteredPositions}
          gap={{ rows: 10, columns: 10 }}
          items={activeWidgets}
          onReposition={handleReposition}
          className="tileLayout"
        />
        <aside className="k-ml-4 dashboardAside">
          <div className="k-mb-10">
            <button className="k-button" onClick={onResetLayout}>
              Reset layout
            </button>
          </div>
          <div>
            <h2 className="k-mb-4">Toggle Widgets</h2>
            <div>
              {widgets.map(widget => {
                return (
                  <div className="k-mb-3" key={widget.id}>
                    <Switch
                      checked={widget.active}
                      onChange={onToggleWidget}
                      id={widget.id}
                    />
                    <label className="k-ml-4">{widget.header}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="k-mb-4">Add Widgets</h2> {/* bouton pour ajouter des widgets */}
            <div>
              {/* a voir si c'est facile avec une boucle ou crée chaque bouton
              a la main pour link une fonction a chaque bouton au lieu de celle générique ligne 100 */}
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Temperature", <Temperature/>, true, toString(uid), 1, 1, 2)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Temperature</label>
                  </div>
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Covid Tracker", <Covid/>, true, toString(uid), 2, 1, 2)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Covid Tracker</label>
                  </div>
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Money Converter", <MoneyConverter/>, true, toString(uid), 3, 2, 1)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Money Converter</label>
                  </div>
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Spotify", <Spotify/>, true, toString(uid), 3, 2, 3)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Spotify</label>
                  </div>
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Sub Count", <SubCount/>, true, toString(uid), 1, 1, 2)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Sub Count</label>
                  </div>
                  <div className="k-mb-3">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAdd("Last Video", <LastVideo/>, true, toString(uid), 2, 1, 2)}>
                      <AddIcon />
                    </Fab>
                    <label className="k-ml-4">Last Video</label>
                  </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
