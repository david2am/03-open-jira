import { Button, Box, TextField } from '@mui/material';
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    const { addNewEntry } = useContext( EntriesContext )
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

    const [inputValue, setInputValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)


    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => setInputValue(event.target.value)
    const onSave = () => {
        if ( inputValue.length === 0 ) return

        addNewEntry( inputValue )

        // reset ui
        setInputValue('')
        setIsTouched(false)
        setIsAddingEntry(false)
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            helperText={ inputValue.length <= 0 && isTouched && 'Ingrese un valor' }
                            error={ inputValue.length <= 0 && isTouched }
                            value={ inputValue }
                            onChange={ onTextChange }
                            onBlur={ () => setIsTouched( true ) }
                        />
                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant='text'
                                onClick={() => setIsAddingEntry( false )}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={ <SaveOutlinedIcon /> }
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                )
                : (
                    <Button
                        startIcon={ <AddCircleOutlineOutlinedIcon /> }
                        fullWidth
                        variant='outlined'
                        onClick={ () => setIsAddingEntry( true ) }
                    >
                        Agregar Tarea
                    </Button>
                )
            }

            
        </Box>
    )
}
