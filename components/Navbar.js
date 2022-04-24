import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Wallet/connectors";
import { SlideIn } from "animations/SlideIn";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, [activate]);

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div>
      <nav className="fixed z-10 w-full bg-white shadow-lg ">
        <div className="w-full">
          <div className="flex items-center w-full h-20">
            <div className="flex items-center justify-between w-full mx-10">
              <div className="flex items-center justify-center flex-shrink-0 ">
                <h1 className="text-xl font-bold cursor-pointer ">
                  UrbanDogz<span className="text-black"> Club</span>
                </h1>
                <img src="/Logo.png" alt="Logo" width={64} height={64} />
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <a
                    href="https://urbandogz.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    
                    offset={50}
                    duration={500}
                    className="px-3 py-2 font-semibold text-black cursor-pointer text-md hover:font-black"
                  >
                    Web
                  </a>
                  <a
                    href="https://discord.gg/urbandogz"
                    target="_blank"
                    rel="noopener noreferrer"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                  >
                    Discord
                  </a>
                  <a
                    href="https://opensea.io/collection/urbandogz"
                    target="_blank"
                    rel="noopener noreferrer"
                    activeClass="work"
                    to="work"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                  >
                    Opensea
                  </a>

                  <a
                    href="https://twitter.com/urbandogzclub"
                    activeClass="Services"
                    target="_blank"
                    rel="noopener noreferrer"
                    to="work"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                  >
                    Twitter
                  </a>
                  {active ? (
                    <button
                      className="px-3 py-2 m-2 text-sm text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                      onClick={disconnect}
                    >
                      Disconnect ...{account.slice(-5)}
                    </button>
                  ) : (
                    <button
                      className="px-3 py-2 m-2 text-sm text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                      onClick={connect}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex mr-10 md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
		<SlideIn isActive={isOpen} orientation="vertical">
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white sm:px-3">
            <ul>
              <li>
                <a
                  href="https://urbandogz.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  activeClass="website"
                  to="home"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                >
                  Website
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/urbandogz"
                  target="_blank"
                  rel="noopener noreferrer"
                  activeClass="about"
                  to="about"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://opensea.io/collection/urbandogz"
                  target="_blank"
                  rel="noopener noreferrer"
                  activeClass="work"
                  to="work"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                >
                  Opensea
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/urbandogzclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  activeClass="services"
                  to="services"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-black hover:text-white"
                >
                  Twitter
                </a>
              </li>
              <li>
                {active ? (
                  <button
                    className="px-3 py-2 m-2 text-sm text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
                    onClick={disconnect}
                  >
                    Disconnect ...{account.slice(-5)}
                  </button>
                ) : (
                  <button
                    className="px-3 py-2 m-2 text-sm text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                    onClick={connect}
                  >
                    Connect Wallet
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
		</SlideIn>
      </nav>
    </div>
  );
}

export default Navbar;
