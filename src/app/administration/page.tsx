import React from "react";

import { redirect } from "next/navigation";

const page = async () => {
    redirect("administration/utilisateurs");

    return <></>;
};

export default page;
