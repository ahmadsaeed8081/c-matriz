import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { LockIcon } from "../../assets";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Web3 from "web3";

import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
} from "../../../src/components/config";

const Main = (props) => {
  const [loader, setLoader] = useState(false);
  let plan1_fee = 25;
  let plan2_fee = 50;
  let plan3_fee = 100; // dont forget to change
  let plan4_fee = 200;
  let plan5_fee = 400;
  let plan6_fee = 800; // dont forget to change
  let plan7_fee = 1600;
  let plan8_fee = 3200;
  let plan9_fee = 6400; // dont forget to change
  let plan10_fee = 12800;

  const [activeTab, setActiveTab] = useState("LEVEL");

  const cardList = [{}, {}, {}];
  const [total_earning, set_total_earning] = useState("");

  const [level_earning, set_level_earning] = useState("");
  const [current_plan, set_current_plan] = useState("NAN");

  const [bonus, set_bonus] = useState("");
  const [direct_ref, set_direct_ref] = useState("");
  const [globalRef_direct, set_globalRef_direct] = useState([]);
  const [globalRef_team, set_globalRef_team] = useState([]);

  const [globalRef_earning, set_globalRef_earning] = useState([]);

  const [totalglobal_earning, set_totalglobal_earning] = useState([]);

  const [uplinerId, set_uplinerId] = useState("");
  const [userId, set_userId] = useState("");

  const [is_paid, set_paid] = useState(false);
  const [is_gloabl_plan1_paid, set_global_plan1_paid] = useState(false);
  const [is_gloabl_plan2_paid, set_global_plan2_paid] = useState(false);
  const [is_gloabl_plan3_paid, set_global_plan3_paid] = useState(false);

  const [is_gloabl_plan4_paid, set_global_plan4_paid] = useState(false);
  const [is_gloabl_plan5_paid, set_global_plan5_paid] = useState(false);
  const [is_gloabl_plan6_paid, set_global_plan6_paid] = useState(false);

  const [is_gloabl_plan7_paid, set_global_plan7_paid] = useState(false);
  const [is_gloabl_plan8_paid, set_global_plan8_paid] = useState(false);
  const [is_gloabl_plan9_paid, set_global_plan9_paid] = useState(false);
  const [is_gloabl_plan10_paid, set_global_plan10_paid] = useState(false);

  const [reg_earning, set_reg_earning] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [plane1_data, set_plane1_data] = useState([]);
  const [plane2_data, set_plane2_data] = useState([]);
  const [plane3_data, set_plane3_data] = useState([]);

  const [plane4_data, set_plane4_data] = useState([]);
  const [plane5_data, set_plane5_data] = useState([]);
  const [plane6_data, set_plane6_data] = useState([]);

  const [plane7_data, set_plane7_data] = useState([]);
  const [plane8_data, set_plane8_data] = useState([]);
  const [plane9_data, set_plane9_data] = useState([]);
  const [plane10_data, set_plane10_data] = useState([]);

  const [r11, set_r11] = useState(0);
  const [r12, set_r12] = useState(0);

  const [r21, set_r21] = useState(0);
  const [r22, set_r22] = useState(0);

  const [r31, set_r31] = useState(0);
  const [r32, set_r32] = useState(0);

  const [r41, set_r41] = useState(0);
  const [r42, set_r42] = useState(0);

  const [r51, set_r51] = useState(0);
  const [r52, set_r52] = useState(0);

  const [r61, set_r61] = useState(0);
  const [r62, set_r62] = useState(0);

  const [r71, set_r71] = useState(0);
  const [r72, set_r72] = useState(0);

  const [r81, set_r81] = useState(0);
  const [r82, set_r82] = useState(0);

  const [r91, set_r91] = useState(0);
  const [r92, set_r92] = useState(0);

  const [r101, set_r101] = useState(0);
  const [r102, set_r102] = useState(0);

  useEffect(() => {
    getData();
  }, [props.provider, props.address]);


  async function getData() {
    if (!props.isWalletConnected) {
      return;
    }
    try {
      setLoader(true);
      console.log("object"+ loader);
      const web3 = new Web3(props.provider);

      const contract = new web3.eth.Contract(cont_abi, cont_address);

      const fee_paid = await contract.methods.is_paid(props.address).call();

      let user_id = await contract.methods
        .addresstoId(props.address.toString())
        .call();

      let level_matrix_earning = await contract.methods
        .levelMatrix_earningOf(props.address)
        .call();

      let upliner = await contract.methods.uplinerOf(props.address).call();

      let bonus = await contract.methods
        .get_bonus()
        .call({ from: props.address.toString() });

      let regfee_earning = await contract.methods
        .regfee_earningOf(props.address)
        .call();

      let total_earning = await contract.methods
        .Total_earningOf(props.address)
        .call();
      let direct_ref = await contract.methods
        .Direct_ReferralsOf(props.address)
        .call();
      let totalglobal_earning = await contract.methods
        .get_totalglobal_earning()
        .call({ from: props.address.toString() });

      let globalRef_direct = await contract.methods
        .get_globalRef_direct()
        .call({ from: props.address.toString() });
      let globalRef_earning = await contract.methods
        .get_globalRef_earning()
        .call({ from: props.address.toString() });

      let globalRef_team = await contract.methods
        .get_globalRef_team()
        .call({ from: props.address.toString() });

      let upliner_id = await contract.methods.addresstoId(upliner).call();

      set_reg_earning(regfee_earning);
      set_direct_ref(direct_ref);
      set_globalRef_direct(globalRef_direct);
      set_globalRef_team(globalRef_team);

      set_globalRef_earning(globalRef_earning);

      set_totalglobal_earning(totalglobal_earning);
      set_total_earning(total_earning);
      set_bonus(bonus);
      set_level_earning(level_matrix_earning);
      set_paid(fee_paid);

      set_userId(user_id);
      set_uplinerId(upliner_id);

      let data = await contract.methods
        .data(0, props.address)
        .call({ from: props.address.toString() });
      set_plane1_data(data);
      let data1 = await contract.methods
        .data(1, props.address)
        .call({ from: props.address.toString() });
      set_plane2_data(data1);
      let data2 = await contract.methods
        .data(2, props.address)
        .call({ from: props.address.toString() });
      set_plane3_data(data2);

      let data3 = await contract.methods
        .data(3, props.address)
        .call({ from: props.address.toString() });
      set_plane4_data(data3);

      let data4 = await contract.methods
        .data(4, props.address)
        .call({ from: props.address.toString() });
      set_plane5_data(data4);

      let data5 = await contract.methods
        .data(5, props.address)
        .call({ from: props.address.toString() });
      set_plane6_data(data5);

      let data6 = await contract.methods
        .data(6, props.address)
        .call({ from: props.address.toString() });
      set_plane7_data(data6);

      let data7 = await contract.methods
        .data(7, props.address)
        .call({ from: props.address.toString() });
      set_plane8_data(data7);

      let data8 = await contract.methods
        .data(8, props.address)
        .call({ from: props.address.toString() });
      set_plane9_data(data8);

      let data9 = await contract.methods
        .data(9, props.address)
        .call({ from: props.address.toString() });
      set_plane10_data(data9);

      let ref_check = await contract.methods
        .get_checkRef()
        .call({ from: props.address.toString() });

      set_r11(ref_check[0]);
      set_r12(ref_check[1]);

      set_r21(ref_check[2]);
      set_r22(ref_check[3]);

      set_r31(ref_check[4]);
      set_r32(ref_check[5]);

      set_r41(ref_check[6]);
      set_r42(ref_check[7]);

      set_r51(ref_check[8]);
      set_r52(ref_check[9]);

      set_r61(ref_check[10]);
      set_r62(ref_check[11]);

      set_r71(ref_check[12]);
      set_r72(ref_check[13]);

      set_r81(ref_check[14]);
      set_r82(ref_check[15]);

      set_r91(ref_check[16]);
      set_r92(ref_check[17]);

      set_r101(ref_check[18]);
      set_r102(ref_check[19]);

      const global_paid = await contract.methods
        .check_globalPlans_bought()
        .call({ from: props.address.toString() });

      set_global_plan1_paid(global_paid[0]);
      set_global_plan2_paid(global_paid[1]);
      set_global_plan3_paid(global_paid[2]);
      set_global_plan4_paid(global_paid[3]);
      set_global_plan5_paid(global_paid[4]);
      set_global_plan6_paid(global_paid[5]);
      set_global_plan7_paid(global_paid[6]);
      set_global_plan8_paid(global_paid[7]);
      set_global_plan9_paid(global_paid[8]);
      set_global_plan10_paid(global_paid[9]);




      var current_plan;
      if(!fee_paid){
        current_plan="None";
      }
      else if(!global_paid[0])
      {
          current_plan="Level Matrix";
      }
      else if(!global_paid[1]){

          current_plan=" Global plan 1";

      }
      else if(!global_paid[2]){
          current_plan="Global plan 2";

      }
      else if(!global_paid[3]){
          current_plan="Global plan 3";

      }
      else if(!global_paid[4]){
          current_plan="Global plan 4";

      }
      else if(!global_paid[5]){
          current_plan="Global plan 5";

      }
      else if(!global_paid[6]){
          current_plan=" Global plan 6";

      }
      else if(!global_paid[7]){
          current_plan="Global plan 7";

      }
      else if(!global_paid[8]){
          current_plan="Global plan 8";

      }
      else if(!global_paid[9]){
          current_plan="Global plan 9";
      }
      else{
          current_plan="Global plan 10";
      }


      set_current_plan(current_plan);



      setLoader(false);
    } catch (error) {
      // Catch any errors for any of the above operations.
      setLoader(false);
      console.error(error);
    }
  }

  async function active_globalmatrix(plan_no) {
    if (!props.isWalletConnected) {
      return;
    }

    try {
      const web3 = new Web3(props.provider);

      const accounts = await web3.eth.getAccounts();

      const contract = new web3.eth.Contract(cont_abi, cont_address);
      const contract1 = new web3.eth.Contract(tokenABI, Token_address);
      const curr_bal = props.balance;
      if (plan_no == "0") {
        if (!is_paid) {
          alert("You have to pay the reg fee first");
          return;
        } else if (Number(curr_bal) < Number(plan1_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        }
        plan1_fee = plan1_fee * 10 ** 18;
        console.log(typeof plan1_fee + "   " + plan1_fee);

        await contract1.methods
          .approve(cont_address, plan1_fee.toString())
          .send({ from: accounts[0] });
        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });
        if (result) {
          getData();
        }
      } else if (plan_no == "1") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan2_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan1_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan2_fee = plan2_fee * 10 ** 18;
        console.log(typeof plan2_fee + "   " + plan2_fee);

        await contract1.methods
          .approve(cont_address, plan2_fee.toString())
          .send({ from: accounts[0] });
        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });
        if (result) {
          getData();
        }
      } else if (plan_no == "2") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan3_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan2_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan3_fee = plan3_fee * 10 ** 18;
        console.log(typeof plan3_fee + "   " + plan3_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan3_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "3") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan4_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan3_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan4_fee = plan4_fee * 10 ** 18;
        console.log(typeof plan4_fee + "   " + plan4_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan4_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "4") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan5_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan4_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan5_fee = plan5_fee * 10 ** 18;
        console.log(typeof plan5_fee + "   " + plan5_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan5_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "5") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan6_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan5_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan6_fee = plan6_fee * 10 ** 18;
        console.log(typeof plan6_fee + "   " + plan6_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan6_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "6") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan7_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan6_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan7_fee = plan7_fee * 10 ** 18;
        console.log(typeof plan7_fee + "   " + plan7_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan3_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "7") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan8_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan7_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan8_fee = plan8_fee * 10 ** 18;
        console.log(typeof plan8_fee + "   " + plan8_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan8_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "8") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan9_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan8_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan9_fee = plan9_fee * 10 ** 18;
        console.log(typeof plan9_fee + "   " + plan9_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan9_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      } else if (plan_no == "9") {
        if (!is_paid) {
          alert("You have to pay the gas fee first");
          return;
        } else if (Number(curr_bal) < Number(plan10_fee)) {
          alert("You dont have enough balance to buy this plan");
          return;
        } else if (is_gloabl_plan9_paid == false) {
          alert("You have to buy the previous plan first");
          return;
        }

        plan10_fee = plan10_fee * 10 ** 18;
        console.log(typeof plan10_fee + "   " + plan10_fee);

        const approval = await contract1.methods
          .approve(cont_address, plan10_fee.toString())
          .send({ from: accounts[0] });

        const result = await contract.methods
          .global_matrix(plan_no)
          .send({ from: accounts[0] });

        if (result) {
          getData();
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }

  return (
    <>
      {/* set_user={set_user} search_Data={search_Data} */}
      {!props.itsview ? (
        <Header
          set_user={props.set_user}
          search_Data={props.search_Data}
          address={props.address}
          provider={props.provider}
        />
      ) : null}
      <div className="home-page flex flex-col">
        <div className="wrap wrapWidth">
          <div className="info-wrapper">
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Total Earnings</div>
                <div className="amount">${total_earning / 10 ** 18}</div>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Total Directs</div>
                <div className="amount">{direct_ref}</div>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Total Team</div>
                <div className="amount">
                  {Number(plane1_data[3]) +
                    Number(plane2_data[3]) +
                    Number(plane3_data[3]) +
                    Number(plane4_data[3]) +
                    Number(plane5_data[3]) +
                    Number(plane6_data[3]) +
                    Number(plane7_data[3]) +
                    Number(plane8_data[3]) +
                    Number(plane9_data[3]) +
                    Number(plane10_data[3])}
                </div>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">level Matrix Earning</div>
                <div className="amount">
                  ${Number(level_earning) / 10 ** 18}
                </div>
              </div>
            </div>

            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Global Matrix Earning</div>
                <div className="amount">
                  ${Number(totalglobal_earning) / 10 ** 18}
                </div>
              </div>
            </div>

            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon1.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center">
                <div className="name">Current plan</div>
              </div>
              <div className="card-action flex items-center justify-center">
                <div className="btn button">{current_plan}</div>
              </div>
            </div>

            {/* <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon4.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">G-M Referral Earning</div>
                <div className="amount">
                  ${Number(globalMatrix_Refearning) / 10 ** 18}
                </div>
              </div>
            </div> */}

            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon2.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center">
                <div className="name">Referral Link</div>
              </div>
              <div className="card-action flex items-center justify-between">
                <div className="name">
                  https://crowdmatrix.org/?ref=
                  {props.isWalletConnected ? userId : null}
                </div>

                <CopyToClipboard
                  text={"https://crowdmatrix.org/?ref=" + userId}
                >
                  <div className="icon flex items-center justify-center cursor-pointer">
                    <div className="btn button">Copy Link</div>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon2.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center">
                <div className="name">My Upliner</div>
              </div>
              <div className="card-action flex items-center justify-between">
                <div className="name">{uplinerId}</div>

                <CopyToClipboard text={uplinerId}>
                  <div className="icon flex items-center justify-center cursor-pointer">
                    <div className="btn button">Copy</div>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon2.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Global Bonus</div>
                <div className="amount">${Number(bonus) / 10 ** 18}</div>
              </div>
            </div>
            <div className="info-card flex flex-col items-center">
              <div className="icons flex items-center justify-center relative">
                <img src="./images/ellips.png" className="ellips" />
                <img src="./images/icon2.svg" className="icon absolute" />
              </div>
              <div className="card-name flex items-center justify-center flex-col">
                <div className="name">Id Activation</div>
                <div className="amount">${Number(reg_earning) / 10 ** 18}</div>
              </div>
            </div>
          </div>
          <div className="plan-section flex flex-col">
            <div className="section-tabs flex items-center">
              <div className="tabs flex items-start">
                <button
                  className={`btn button ${
                    activeTab === "LEVEL" ? "active" : ""
                  }`}
                  onClick={(e) => setActiveTab("LEVEL")}
                >
                  LEVEL MATRIX PLAN
                </button>
                <button
                  className={`btn button ${
                    activeTab === "GLOBAL" ? "active" : ""
                  }`}
                  onClick={(e) => setActiveTab("GLOBAL")}
                >
                  GLOBAL MATRIX PLAN
                </button>
              </div>
            </div>
            {activeTab === "LEVEL" ? (
              <div className="planes-block">
                {/* {!is_paid ? (
                  <div className="lock-overlay flex justify-center items-center">
                    <div className="over_wrapper flex flex-col">
                      <div className="icon flex justify-center items-center">
                        <LockIcon />
                      </div>
                      <div className="desc">Pay Fee To Register</div>
                      <div className="action flex items-center justify-center">
                        <div className="btn button" onClick={pay_fee}>
                          Unlock Plan Now
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null} */}

                <div className="plan-wrapper">
                  {/* {["", "", "", "", "", "", "", "", "", ""].map((item, index) => ( */}
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl1</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r11 != "0"
                                ? r11 == 1
                                  ? "green"
                                  : r11 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r12 != "0"
                                ? r12 == 1
                                  ? "green"
                                  : r12 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r13!="0"? r13==1 ? "green": r13==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        {/* <div className="icon flex items-center justify-center">
                            <PartnerIcon />
                          </div> */}
                        <div className="lbl">Partners</div>
                        <div className="val">{plane1_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane1_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>

                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl2</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r21 != "0"
                                ? r21 == 1
                                  ? "green"
                                  : r21 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r22 != "0"
                                ? r22 == 1
                                  ? "green"
                                  : r22 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane2_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane2_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>

                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl3</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r31 != "0"
                                ? r31 == 1
                                  ? "green"
                                  : r31 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r32 != "0"
                                ? r32 == 1
                                  ? "green"
                                  : r32 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r33!="0"? r33==1 ? "green": r33==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane3_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane3_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>

                  {/* card 4 */}

                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl4</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r41 != "0"
                                ? r41 == 1
                                  ? "green"
                                  : r41 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r42 != "0"
                                ? r42 == 1
                                  ? "green"
                                  : r42 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane4_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane4_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>

                  {/* card 5 */}

                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl5</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r51 != "0"
                                ? r51 == 1
                                  ? "green"
                                  : r51 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r52 != "0"
                                ? r52 == 1
                                  ? "green"
                                  : r52 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane5_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane5_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl6</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r61 != "0"
                                ? r61 == 1
                                  ? "green"
                                  : r61 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r62 != "0"
                                ? r62 == 1
                                  ? "green"
                                  : r62 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane6_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane6_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl7</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r71 != "0"
                                ? r71 == 1
                                  ? "green"
                                  : r71 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r72 != "0"
                                ? r72 == 1
                                  ? "green"
                                  : r72 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane7_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane7_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl8</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r81 != "0"
                                ? r81 == 1
                                  ? "green"
                                  : r81 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r82 != "0"
                                ? r82 == 1
                                  ? "green"
                                  : r82 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane8_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane8_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl9</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r91 != "0"
                                ? r91 == 1
                                  ? "green"
                                  : r91 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r92 != "0"
                                ? r92 == 1
                                  ? "green"
                                  : r92 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane9_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane9_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                  <div className="plan-card flex flex-col">
                    <div className="box-hdr flex items-center">
                      <div className="hdr-item">Lvl10</div>
                    </div>
                    <div className="card-boxes flex justify-center items-center">
                      <div className="inner-box flex">
                        <div className="circle-branches rel flex items-center">
                          <div className="circle"></div>
                          <div className="line1"></div>
                          <div className="line2"></div>
                          <div className="line3"></div>
                        </div>
                        <div className="small-boxes flex rel items-center">
                          <div
                            className={`s-box ${
                              r101 != "0"
                                ? r101 == 1
                                  ? "green"
                                  : r101 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          <div
                            className={`s-box ${
                              r102 != "0"
                                ? r102 == 1
                                  ? "green"
                                  : r102 == 2
                                  ? "yellow"
                                  : null
                                : null
                            }`}
                          ></div>
                          {/* <div className={`s-box ${r23!="0"? r23==1 ? "green": r23==2? "yellow":null:null}`}></div> */}
                          <div className="s-box"></div>
                        </div>
                      </div>
                    </div>

                    <div className="info-sec flex items-center justify-between">
                      <div className="info-item flex flex-col">
                        <div className="lbl">Partners</div>
                        <div className="val">{plane10_data[3]}</div>
                      </div>
                      <div className="info-item flex flex-col">
                        <div className="lbl">Cycles</div>
                        <div className="val">{plane10_data[2]}</div>
                      </div>
                    </div>
                    {/* <div className="action flex items-center justify-center">
                          <div className="btn " onClick={(e)=>setOpen1(true)}>View details </div>
                        </div>

                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <CardDetail plan1_data={plane1_data} r11={r11} r12={r12} r13={r13} plan_no={1} plan_fee={2} setOpen={setOpen1} />
                        </Modal> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="prices-block flex items-center justify-center">
                {/* {!is_levelpaid ? (
                  <div className="lock-overlay flex justify-center items-center">
                    <div className="over_wrapper flex flex-col">
                      <div className="icon flex justify-center items-center">
                        <LockIcon />
                      </div>
                      <div className="desc">
                        you have to Unlock level matrix First
                      </div>
                      <div className="action flex items-center justify-center">
                        {/* <div className="btn button" onClick={pay _fee}>Unlock Plan Now</div> */}
                {/* </div>
                    </div>
                  </div> */}
                {/* ) : null} */}

                <div className="prices-wrapper">
                  <div className="price-card flex flex-col">
                    <div className="price-tag">Plan 1</div>
                    <div className="price-amount">{plan1_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs{globalRef_direct[0]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[0]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[0]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan1_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("0")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PRO</div>
                    <div className="price-amount">{plan2_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[1]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[1]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[1]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan2_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("1")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan3_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[2]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[2]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[2]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan3_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("2")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan4_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[3]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[3]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[3]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan4_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("3")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan5_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[4]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[4]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[4]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan5_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("4")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>

                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan6_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[5]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[5]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[5]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan6_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("5")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan7_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[6]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[6]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[6]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan7_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("6")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan8_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[7]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[7]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[7]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan8_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("7")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan9_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[8]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[8]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[8]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan9_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("8")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="price-card flex flex-col">
                    <div className="price-tag">PREMIUM</div>
                    <div className="price-amount">{plan10_fee}$</div>
                    <div className="items-list flex flex-col">
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          No. of Directs {globalRef_direct[9]}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Earning {Number(globalRef_earning[9]) / 10 ** 18}
                        </div>
                      </div>
                      <div className="item flex items-center">
                        <div className="dot"></div>
                        <div className="lbl">
                          Total Team {globalRef_team[9]}
                        </div>
                      </div>
                    </div>
                    {!props.itsview ? (
                      <>
                        {!is_gloabl_plan10_paid ? (
                          <div className="action flex items-center justify-center">
                            <div
                              className="btn-buy button"
                              onClick={() => active_globalmatrix("9")}
                            >
                              Buy Now
                            </div>
                          </div>
                        ) : (
                          <div className="action flex items-center justify-center">
                            <div className="btn-buy button">Activated</div>
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* {activeTab === "GLOBAL" && (
            <div className={`earning-sec flex flex-col`}>
              <div className={`sec-tag`}>My Referral Earnings</div>
              <div className={`table-block flex flex-col`}>
                <div className={`table-row flex items-center`}>
                  <div className={`row-item flex flex-col`}>
                    <div className="row-lbl">Levels</div>
                  </div>
                  <div className={`row-item flex flex-col`}>
                    <div className="row-lbl">Earning Percentage</div>
                  </div>
                  <div className={`row-item flex flex-col`}>
                    <div className="row-lbl">No. of Refered Investors</div>
                  </div>
                  <div className={`row-item flex flex-col`}>
                    <div className="row-lbl">Total Earning (USDT)</div>
                  </div>
                </div>
                {earningLit.map((item, index) => (
                  <div key={index} className={`table-row flex items-center`}>
                    <div className={`row-item flex flex-col`}>
                      <div className="row-lbl">{item.id}</div>
                    </div>
                    <div className={`row-item flex flex-col `}>
                      <div className="row-lbl">{item.num}</div>
                    </div>
                    <div className={`row-item flex flex-col`}>
                      <div className="row-lbl">
                        {item.count ? item.count : "0"}
                      </div>
                    </div>
                    <div className={`row-item flex flex-col `}>
                      <div className="row-lbl">
                        {item.earn ? item.earn / 10 ** 18 : "0"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default Main;
