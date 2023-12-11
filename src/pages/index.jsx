import Modal from "@/components/modal";
import { useEffect, useState } from "react";
import { GiBrain } from "react-icons/gi";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [displayFirstNum, setDisplayFirstNum] = useState(0);
  const [displaySecondNum, setDisplaySecondNum] = useState(0);
  const [sumNum, setSumNum] = useState(0);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [levelDiff, setLevelDiff] = useState(5);
  const [level, setLevel] = useState(10);
  const [time, setTime] = useState(10);

  const add = () => {
    let firstNum = Math.floor(Math.random() * level);
    let secondNum = Math.floor(Math.random() * level);
    let result = firstNum + secondNum;
    setSumNum(result);
    setDisplayFirstNum(firstNum);
    setDisplaySecondNum(secondNum);
  };
  const handleResult = (num) => {
    setInputValue(num.target.value);
    if (num.target.value == sumNum) {
      add();
      setScore(score + 1);
      setInputValue("");
      setTime((time) => time + 1);
    }
  };
  const restart = () => {
    setLevel(0);
    setTime(10);
    setLevelDiff(5);
  };

  // LEVEL UP PROGRESS
  let levelUpProgress = new Promise(function (myResolve, myReject) {
    if (score == levelDiff) {
      myResolve("OK");
    } else {
      myReject("Error");
    }
  });
  levelUpProgress.then(
    function (value) {
      console.log("PROMISE WORKING");
      setLevel(level * 10);
      setLevelDiff(levelDiff + 5);
    },
    function (error) {
      console.log("PROMISE WONT WORKING");
    }
  );

  useEffect(() => {
    add();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(time - 1);
      if (time == 0) {
        setOpen(true);
        restart();
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [time]);
  return (
    <main className="bg-green-950 w-screen h-screen">
      <div className="flex items-center gap-4 text-4xl font-medium text-orange-500 p-10">
        <div>
          <h1 className="text-5xl">Warm Up Your</h1>
          <h1 className="font-normal">By Adding Numbers</h1>
        </div>

        <GiBrain size={"2em"} />
      </div>

      <div className="w-screen flex justify-center mt-20">
        <div className="relative flex flex-col gap-3 text-7xl text-white w-1/2 max-w-md">
          <div className="flex justify-between">
            <p className="text-3xl">Your Score: {score}</p>
            <p className="text-3xl">Timer: {time}</p>
          </div>
          <p className="bg-green-900 p-3 rounded-lg text-right">
            {displayFirstNum}
          </p>
          <p className="bg-green-900 p-3 rounded-lg text-right">
            {displaySecondNum}
          </p>
          <div>
            <div className="w-full h-2 bg-white rounded-xl mb-2"></div>
            <input
              value={inputValue}
              className="bg-green-900 p-3 rounded-lg text-right w-full"
              type="number"
              autoFocus
              onChange={handleResult}
            />
          </div>

          <div className="absolute top-28 -left-14">+</div>
        </div>
      </div>
      <Modal open={open} />
    </main>
  );
}
