import { useState } from "react";

type Selected = {
  rotation: number;
  item: number;
};

function App() {
  const [selected, setSelected] = useState<Selected[]>([]);
  let list: (Number | String)[] = ['','','','','','','','',''];
  for (let i = 1; i <= 16; i++) {
    list.push(i);
  }
  let rotations: Number[] = [];
  for (let i = 0; i < 360; i += 3) {
    rotations.push(i);
  }
  return (
    <div className="relative flex items-center justify-center h-screen App">
      {rotations.map((rotation, rotKey) => {
        return (
          <div
            key={rotKey}
            className="absolute origin-center"
            style={{
              rotate: `${rotation}deg`,
            }}
          >
            <div
              className="absolute flex"
              style={{
                clipPath: `polygon(0 50%, 100% 0, 100% 100%)`,
                overflow: "hidden",
              }}
            >
              {list.map((item, itemKey) => {
                return (
                  <div
                    key={itemKey}
                    className={`w-5 ${
                      selected.some((i) => i.rotation === rotKey && i.item === itemKey) ? "bg-red-500" : "bg-yellow-500"
                    } border padding`}
                    onClick={() => {
                      if (selected.some((i) => i.rotation === rotKey && i.item === itemKey)) {
                        console.log("remove");
                        setSelected(selected.filter((i) => i.rotation !== rotKey || i.item !== itemKey));
                      } else {
                        setSelected([...selected, { rotation: rotKey, item: itemKey }]);
                      }
                      console.log(rotKey, itemKey, { rotation: rotKey, item: itemKey }, selected);
                    }}
                  >
                    {String(item)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
