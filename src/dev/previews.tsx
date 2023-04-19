import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import LoginPage from "../pages/loginPage/loginPage";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LoginPage">
                <LoginPage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;