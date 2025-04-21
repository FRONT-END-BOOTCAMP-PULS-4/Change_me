"use client";

import { useState } from "react";

export default function MemberFilterButtons() {
    const [mine, setMine] = useState<boolean>(false);

    const toggleOption = async () => {
        try {
            setMine(!mine);
        } catch (error) {}
    };

    // TODO: styling two buttons based on 'mine' option
    return (
        <ol>
            <li>
                <button>전체</button>
            </li>
            <li>
                <button>내 메시지</button>
            </li>
        </ol>
    );
}
