import React from 'react';
import games from "./UI/games.module.css";

const Table = () => {
    return (
        <div>
            <div className={games.table}>
                <p style={{color: "white"}}>LIVE<h1 className={games.activeButton}>Все ставки</h1></p>
                <hr className={games.hr}/>
                <table>
                    <tr>
                        <th>ИГРА</th>
                        <th>ИГРОК</th>
                        <th>ВРЕМЯ</th>
                        <th>СТАВКА</th>
                        <th>КОЭФФ.</th>
                        <th>ВЫИГРЫШ</th>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>

                            <a>Coinflip</a>



                        </td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>
                    <tr>


                        <td className={games.game}>Baccarat</td>
                        <td className={games.nickname}>fistingA</td>
                        <td className={games.time}>11:57</td>
                        <td className={games.stavka}>4.000 P</td>
                        <td className={games.koef}>2.00x</td>
                        <td className={games.win}>7.670 P</td>

                    </tr>
                    <hr className={games.hr1}/>



                </table>
            </div>
            <div className={games.paldron}>
                <p className={games.paldron_text}>ВСЕГО ИГРОКОВ</p>
                <p className={games.paldron_description}>1 964 234</p>

            </div>
            <div className={games.paldron}>
                <p className={games.paldron_text}>ЗА СЕГОДНЯ ИГРОКОВ</p>
                <p className={games.paldron_description}>51</p>

            </div>
            <div className={games.paldron}>
                <p className={games.paldron_text}>СЫГРАНО ИГР</p>
                <p className={games.paldron_description}>2143</p>

            </div>
            <div className={games.paldron}>
                <p className={games.paldron_text}>СУММА СТАВОК</p>
                <p className={games.paldron_description}>2 394 163 Р</p>

            </div>
        </div>
    );
};

export default Table;