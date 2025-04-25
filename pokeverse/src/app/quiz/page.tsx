"use client";
import Navbar from "@/components/Navbar";
import PokeButton from "@/components/PokemonButton";

export default function Quiz() {
  const CreateButton = "Create";
  const StartButton = "Start";

  const inputcss =
    "bg-[#2e2e2e] h-[45px] w-[180px] rounded-4xl flex justify-center items-center m-[10px]  shadow";

  return (
    <div className="p-5 h-screen bg-[#1f1f1f] flex items-center justify-center">
      <div className="w-full bg-[#0e0e0e] h-full rounded-lg overflow-hidden shadow-lg">
        <Navbar />
        <div className="h-full flex flex-col justify-center items-center gap-[50px]">
          <div className="text-5xl font-bold font-[Piedra]">PokeQuiz</div>
          <div className="flex flex-row items-center gap-[100px]">
            {/* Single Player Card */}
            <div className="bg-[#1e1e1e] h-[350px] w-[300px] border-0 rounded-[40px] flex flex-col justify-evenly items-center">
              <div className="text-3xl h-[45px] w-[210px] rounded-4xl flex justify-center items-center m-[10px] font-[Piedra]">
                Single Player
              </div>

              {/* Form */}
              <form className="flex flex-col items-center font-[Mogra] ">
                {/* Difficulty Dropdown */}
                <div className={inputcss}>
                  <select
                    defaultValue="none"
                    className="bg-[#2e2e2e] text-white border-none outline-none w-[100px] m-0"
                  >
                    <option value="none" disabled>
                      Difficulty
                    </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Region Dropdown */}
                <div className={inputcss}>
                  <select
                    id="region"
                    defaultValue="none"
                    className="bg-[#2e2e2e] text-white border-none outline-none w-[100px] m-0"
                  >
                    <option value="none" disabled>
                      Region
                    </option>
                    <option value="kanto">Kanto</option>
                    <option value="johto">Johto</option>
                    <option value="hoenn">Hoenn</option>
                    <option value="sinnoh">Sinnoh</option>
                    <option value="unova">Unova</option>
                    <option value="kalos">Kalos</option>
                    <option value="alola">Alola</option>
                    <option value="galar">Galar</option>
                    <option value="paldea">Paldea</option>
                  </select>
                </div>

                {/* Rounds Dropdown */}
                <div className={inputcss}>
                  <select
                    defaultValue="none"
                    className="bg-[#2e2e2e] text-white border-none outline-none w-[100px] m-0"
                  >
                    <option value="none" disabled>
                      Rounds
                    </option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>

                {/* Start Button */}
                <div className="mt-2">
                  <PokeButton buttonName={StartButton} />
                </div>
              </form>
            </div>

            {/* Multiplayer Card */}
            <div className="bg-[#1e1e1e] h-[350px] w-[300px] border-0 rounded-[40px] flex flex-col justify-evenly items-center">
              <div className="text-3xl h-[45px] w-[270px] rounded-4xl flex justify-center items-center m-[10px] font-[Piedra] relative bottom-[35px]">
                Play With Friends
              </div>
              <div className="flex flex-col justify-evenly items-center relative bottom-[40px]">
                <button className={inputcss + " font-[Mogra]"}>
                  Create
                </button>
                <button className={inputcss + " font-[Mogra]"}>Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
