import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './MoneyConverter.css';

const MoneyConver = props => {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.post("http://localhost:8080/services/currency", {currency : from})
     .then((res) => {
        setInfo(res.data.message[from]);
      })
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])

  const convert = props => {
    var rate = info[to];
    setOutput(input * rate);
  };

  const flip = props => {
    var temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input type="text"
             placeholder=" Enter the amount ..."
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown options={options}
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px"
                        onClick={() => { flip()}}/>
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown options={options}
                    onChange={(e) => {setTo(e.value)}}
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{convert()}} className="convert-button">Convert</button>
        <p className="convert-result">{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>
      </div>
    </div>
  );
};

export default MoneyConver;
