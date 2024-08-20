import { Image, ImageBackground, View } from "react-native";
import {Images} from "./../../config/images"
import FastImage from 'react-native-fast-image';

export default function PageLoader() {
    return (
            <View style={{textAlign:"center"}}>
                <FastImage source={Images.loader}style={{width:400,height:250,textAlign:"center"}}/>
            </View>
    )
};