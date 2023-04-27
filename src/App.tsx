import { useEffect, useState } from "react";

type Selected = {
  rotation: number;
  item: number;
};

function App() {
  const [selected, setSelected] = useState<Selected[]>([]);
  const [bin1, setBin1] = useState<String[]>([]);
  const [bin2, setBin2] = useState<String[]>([]);
  const [hex1, setHex1] = useState<String>("");
  const [hex2, setHex2] = useState<String>("");
  let list: (Number | String)[] = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
  }
  let rotations: Number[] = [];
  for (let i = 0; i < 120; i += 1.5) {
    rotations.push(i);
  }

  useEffect(() => {
    if (selected.length > 0) {
      let bin1arr: String[] = [];
      type Mapping = {
        [key: number]: number;
      };
      const mapping: Mapping = {
        0: 7,
        1: 6,
        2: 5,
        3: 4,
        4: 3,
        5: 0,
        6: 1,
        7: 2,
      }
      // let bin2arr: String[] = [];
      let hex1str: String = "";
      // let hex2str: String = "";
      for (let i = 0; i < 128; i++) {
        let subArr1: Number[] = Array(8).fill(0);
        // let subArr2: Number[] = [];
        for (let j = 0; j < 8; j++) {
          if (selected.some((item) => item.rotation === i && item.item === j)) {
            subArr1[mapping[j]] = 1;
          }
          // if (selected.some((item) => item.rotation === i)) {
          //   // subArr1.push(1);
          //   subArr1[mapping[item.item]] = 1;
          //   // subArr1.
          // }
          // else {
          //   subArr1.push(0);
          // }
        }
        // for (let j = 8; j < 16; j++) {
        //   if (selected.some((item) => item.rotation === i && item.item === j)) {
        //     subArr2.push(1);
        //   } else {
        //     subArr2.push(0);
        //   }
        // }
        bin1arr.push(subArr1.join(""));
        subArr1.slice(0, 4)
        // bin2arr.push(subArr2.join(""));
        subArr1.reverse();
        // subArr2.reverse();
        console.log(subArr1, parseInt(subArr1.slice(0, 4).join(""), 2).toString(16), parseInt(subArr1.slice(4, 8).join(""), 2).toString(16))
        hex1str += parseInt(subArr1.slice(0, 4).join(""), 2).toString(16);
        hex1str += parseInt(subArr1.slice(4, 8).join(""), 2).toString(16);
        console.log(i, hex1str)
        // hex2str += parseInt(subArr2.join(""), 2).toString(16);
      }
      setBin1(bin1arr);
      // setBin2(bin2arr);
      setHex1(hex1str);
      // setHex2(hex2str);
    }
  }, [selected]);

  return (
    <div className="relative flex items-center justify-center h-screen App">
      {rotations.map((rotation, rotKey) => {
        return (
          <div
            key={rotKey}
            className="absolute origin-center"
            style={{
              rotate: `${-rotation * 3}deg`,
            }}
          >
            <div
              className="absolute flex"
              style={{
                // clipPath: `polygon(0 50%, 100% 0, 100% 100%)`,
                overflow: "hidden",
              }}
            >
              {list.map((item, itemKey) => {
                return (
                  <div
                    key={itemKey}
                    className={`relative w-5 h-6 ${
                      selected.some((i) => i.rotation === rotKey && i.item === itemKey) ? "bg-red-500 z-50" : "bg-yellow-500 z-10"
                    } ${itemKey < 1 ? "ml-48" : null} border padding`}
                    onClick={() => {
                      if (selected.some((i) => i.rotation === rotKey && i.item === itemKey)) {
                        // console.log("remove");
                        setSelected(selected.filter((i) => i.rotation !== rotKey || i.item !== itemKey));
                      } else {
                        setSelected([...selected, { rotation: rotKey, item: itemKey }]);
                      }
                      // console.log(rotKey, itemKey, { rotation: rotKey, item: itemKey }, selected);
                    }}
                  >
                    {String("")}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <textarea className="absolute top-0 left-0 h-screen p-2 border w-96" value={JSON.stringify(bin1) + "\n\nhex: " + hex1} />
      {/* <textarea className="absolute top-0 right-0 h-screen p-2 border w-96" value={JSON.stringify(bin2) + "\n\nhex: " + hex2} /> */}
    </div>
  );
}

export default App;
