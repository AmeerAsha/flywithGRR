import React from 'react'
import {  ScrollView, View } from 'react-native'
import { Text } from '../../components'
import {useTranslation} from 'react-i18next';
import {BaseStyle, BaseColor, useTheme} from '../../config';
import styles from './styles';

const AboutUs = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  return (
    <ScrollView>
    <View style={styles.Container}>
        <View style={styles.body1}>
          <Text title1 black style={{color:BaseColor.orangeColor}}>{t('About GRR Tours & Travels')}</Text>
          <Text subhead regular style={styles.para1}>{t('Welcome to GRR Tours & Travels, where we redefine the travel experience by combining the joy of exploration with a commitment to sustainable and eco-friendly practices. At GRR Tours & Travels, we believe in providing you with not just a trip, but a journey that respects our planet and communities.')}</Text>
          <Text subhead regular style={styles.para1}>{t('Your trusted partner in sustainable and seamless travel experiences. At GRR Tours & Travels, we understand that obtaining the right visas can be a crucial aspect of your journey. Thats why we go the extra mile to ensure your travel dreams come true, providing not just flights, holidays, and hotels, but also hassle-free visa services.')}</Text>
        </View>
        <View style={styles.body1}>
          <Text title2 heavy style={{color:BaseColor.orangeColor}}>{t('Our Mission:')}</Text>
          <Text subhead regular style={styles.para1}>{t('At GRR Tours & Travels, our mission is to make travel a force for good. We are dedicated to curating unforgettable experiences that not only enrich your life but also contribute to the well-being of the environment and local communities. We aim to create a sustainable travel ecosystem that promotes responsible tourism.')}</Text>
        </View>
        <View style={styles.body1}>
          <Text title2 heavy style={{color:BaseColor.orangeColor}}>{t('What Sets Us Apart:')}</Text>
          <Text subhead bold style={styles.para1}>{t('Eco-Friendly Travel:')}</Text>
          <Text subhead regular style={styles.para2}>{t("We prioritize eco-friendly accommodations, transportation, and activities to minimize our carbon footprint. By choosing GRR Tours & Travels, you contribute to the preservation of the planet's natural beauty.")}</Text>
          <Text subhead bold style={styles.para1}>{t('Community Engagement:')}</Text>
          <Text subhead regular style={styles.para2}>{t('We believe in the transformative power of travel to create positive change. Our itineraries often include opportunities for community engagement, fostering cultural exchange and supporting local businesses.')}</Text>
          <Text subhead bold style={styles.para1}>{t('Destination Weddings with a Purpose:')}</Text>
          <Text subhead regular style={styles.para2}>{t('Planning your dream destination wedding? We specialize in crafting sustainable and breathtaking destination weddings that not only celebrate your love but also contribute to the conservation and well-being of the chosen destination.')}</Text>
        </View>
        <View style={styles.body1}>
          <Text title2 heavy style={{color:BaseColor.orangeColor}}>{t('Our Services:')}</Text>
          <Text subhead bold style={styles.para1}>{t('Flights:')}</Text>
          <Text subhead regular style={styles.para2}>{t('GRR Tours & Travels offers a wide range of flight options, connecting you to destinations near and far. Choose from various airlines and travel classes to find the perfect fit for your journey.')}</Text>
          <Text subhead bold style={styles.para1}>{t('Holidays:')}</Text>
          <Text subhead regular style={styles.para2}>{t("Whether you seek an adventurous escape, a relaxing beach retreat, or a cultural immersion, our holiday packages cater to every traveler's desires. Explore our carefully curated itineraries designed for sustainable and memorable experiences.")}</Text>
          <Text subhead bold style={styles.para1}>{t('Hotels:')}Hotels:</Text>
          <Text subhead regular style={styles.para2}>{t('Discover eco-friendly and sustainable accommodations that align with our commitment to responsible tourism. We handpick hotels that prioritize environmental conservation and community engagement.')}</Text>
          <Text subhead bold style={styles.para1}>{t('Destination Weddings:')}</Text>
          <Text subhead regular style={styles.para2}>{t('Plan your dream destination wedding with GRR Tours & Travels, where each celebration is crafted with love and sustainability in mind. We work closely with local partners to create unforgettable moments while preserving the beauty of the chosen location')}</Text>
          <Text subhead bold style={styles.para1}>{t('Visa Assistance for Multiple Destinations:')}</Text>
          <Text subhead regular style={styles.para2}>{t("Whether you're exploring a single country or embarking on a multi-country adventure, our visa services cover a wide range of destinations. Count on us to simplify the visa process for your chosen locations.")}</Text>
        </View>
        <View style={styles.body1}>
          <Text title2 heavy style={{color:BaseColor.orangeColor}}>{t('Join Us in Greening Your Travels:')}</Text>
          <Text subhead regular style={styles.para1}>{t("Embark on a journey with GRR Tours & Travels, where every adventure is an opportunity to make a positive impact. Whether you're a solo traveler, a couple, or a group, we invite you to explore the world responsibly with us.")}</Text>
          <Text subhead regular style={styles.para1}>{t("At GRR Tours & Travels, we don't just sell trips; we create sustainable travel experiences that leave a lasting imprint on your heart and the world. Travel with purpose, travel with GRR Tours & Travels.")}</Text>
        </View>
    </View>
    </ScrollView>
  )
}

export default AboutUs
