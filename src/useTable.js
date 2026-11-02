import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 

export function useTable (tableName) {
 const [rows, setRows] = useState([]);
 const [loading, setLoading] = useState([true]);
 const [errorMessage, setErrorMessage] = useState('');
 async function fetchRows() {
    const { data, error } = await supabase
    .from(tableName)
    .select('*');
    if (error) {
        console.error('Error fetching rows:', error);
        setErrorMessage('Unable to load record..');
        setLoading(false);
        return;
    }
    setRows(data);
    setLoading(false);
    }

    useEffect(() => {
        fetchRows();
    }, [tableName]);

    return {
        rows,
        setRows,
        loading,
        errorMessage
    };
}
