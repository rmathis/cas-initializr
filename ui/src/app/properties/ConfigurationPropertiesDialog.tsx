import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { GroupedVirtuoso, Components } from "react-virtuoso";
import { ListSubheader } from "@mui/material";
import { PropertySearch } from './PropertySearch';


export interface ConfigurationPropertiesDialogProps {
    id: string;
    onClose: () => void;
}

const VList: Components["List"] = React.forwardRef(
    ({ style, children }: any, listRef) => {
        return (
            <List
                style={{ padding: 0, ...style, margin: 0, width: "540px" }}
                component="div"
                ref={listRef}
            >
                {children}
            </List>
        );
    }
);

const VItem: Components["Item"] = ({ children, ...props }: any) => {
    return (
        <ListItem component="div" {...props} style={{ margin: 0, padding: 0 }}>
            {children}
        </ListItem>
    );
};

const VGroup: Components["Group"] = ({ children, style, ...props }: any) => {
    return (
        <ListSubheader
            component="div"
            {...props}
            style={{
                ...style,
                margin: 0,
            }}
        >
            {children}
        </ListSubheader>
    );
};

const MUIComponents = { List: VList, Item: VItem, Group: VGroup };


export function ConfigurationPropertiesDialog({ id, onClose }: ConfigurationPropertiesDialogProps) {

    const [open, setOpen] = React.useState(!!id);

    const handleClose = () => {
        onClose();
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    React.useEffect(() => {
        setOpen(!!id);
    }, [id]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Properties</DialogTitle>
            <DialogContent dividers={true}>
                <PropertySearch id={id}>
                    {(properties, groups, counts) => (
                        <GroupedVirtuoso
                            style={{ height: 500 }}
                            groupCounts={counts}
                            components={MUIComponents}
                            groupContent={(index: any) => (
                                <div>{groups[index]}</div>
                            )}
                            itemContent={(index) => {
                                const record = properties[index];

                                const { name, description, example } = record;
                                return (
                                    <ListItemButton>
                                        <ListItemText
                                            primary={`${name}=${example}`}
                                            secondary={description}
                                        />
                                    </ListItemButton>
                                );
                            }}
                        />
                    )}
                </PropertySearch>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}


