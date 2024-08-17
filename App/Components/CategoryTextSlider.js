import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CategoryTextSlider({ selectCategory }) {
    const [active, setActive] = useState(1);

    const categoryList = [
        { id: 1, name: 'Latest' },
        { id: 2, name: 'World' },
        { id: 3, name: 'Business' }, // Fixed spelling
        { id: 4, name: 'Sports' },
        { id: 5, name: 'Life' },
        { id: 6, name: 'Movies' }, // Changed to plural for consistency
        { id: 7, name: 'Government' } // Fixed spelling
    ];

    const onCategoryClick = (id, name) => {
        setActive(id);
        selectCategory(name);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categoryList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onCategoryClick(item.id, item.name)}
                        accessibilityRole="button"
                        accessibilityLabel={`Select ${item.name} category`}
                        accessibilityState={{ selected: item.id === active }}
                    >
                        <Text style={item.id === active ? styles.selectText : styles.unselectText}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    unselectText: {
        marginRight: 10,
        fontSize: 17,
        fontWeight: '500',
        color: 'grey',
    },
    selectText: {
        marginRight: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#7d0a0a',
    },
});

export default CategoryTextSlider;
