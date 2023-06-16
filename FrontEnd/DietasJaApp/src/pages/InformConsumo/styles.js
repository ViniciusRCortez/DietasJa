import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
      },
      inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      input: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#FFFFFF',
      },
      button: {
        marginBottom: 16,
        backgroundColor: '#6200EE',
      },
      buttonLabel: {
        color: '#FFFFFF',
      },
      listSection: {
        marginBottom: 16,
      },
      listItem: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      },
      listItemTitle: {
        fontSize: 16,
        marginBottom: 8,
      },
      listItemDescription: {
        fontSize: 14,
      },
      totalCalories: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    }
)

export default styles