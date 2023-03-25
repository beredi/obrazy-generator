import { Page, Text, StyleSheet, Document, View, Font } from "@react-pdf/renderer";
import { RecordType } from "./Record";
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: require('./font/Roboto/Roboto-Regular.ttf'),
    },
    {
      src: require('./font/Roboto/Roboto-Bold.ttf'),
      fontWeight: 'bold',
    },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Roboto',
  },
  card: {
    padding: 5,
    borderWidth: 2,
    marginBottom: 5,
    width: "50%",
    height: "auto",
  },
  normalText: {
    fontWeight: "normal",
    fontFamily: "Roboto",
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

interface Props {
  records: RecordType[];
}

export const PDFFile = ({ records }: Props) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {records.map((record, index) => {
          return (
            <View key={index} style={styles.card} wrap={false}>
              <Text style={styles.normalText}>
                Naziv: <Text style={styles.bold}>{record.naziv}</Text>
              </Text>
              <Text style={styles.normalText}>
                Tehnika: <Text style={styles.bold}>{record.tehnika}</Text>
              </Text>
              <Text style={styles.normalText}>
                Dimenzija: <Text style={styles.bold}>{record.dimenzija}</Text>
              </Text>
              <Text style={styles.normalText}>
                Autor: <Text style={styles.bold}>{record.autor}</Text>
              </Text>
              <Text style={styles.normalText}>
                Tel.: <Text style={styles.bold}>{record.tel}</Text>
              </Text>
              <Text style={styles.normalText}>
                Cena.: <Text style={styles.bold}>{record.cena}</Text>
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
