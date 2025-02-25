"use client";

import { useState } from "react";
import Image from "next/image";

import avatar from "@/../public/assets/temp/avatar.png";

export const Client = ({ text }: { text: any }) => {

    const [state, setState] = useState<number>(0);

    return <div onClick={() => setState(prevState => prevState + 1)}>
        { text } { state}


        <Image width={100} height={100} src={avatar} alt={"test"} />
    </div>;
};