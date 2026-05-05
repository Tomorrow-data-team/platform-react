import { Select, MenuItem, Box, Typography, Divider } from "@mui/material";import { borderColor } from "polished";
import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Collapse, ListItemButton } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "@emotion/styled";
import { getActiveClients } from "api/clients";
import slugify from "slugify";
import { useQuery } from "@tanstack/react-query";

const ClientBox = styled.div`
  border: 2px solid rgba(255,255,255,0.7);
  border-radius: 8px;
  overflow: hidden;

  transition: all 0.25s ease;

  &:hover {
    border-color: #fff;
  }
`;

const ClientHeader = styled.div`
  padding: 10px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  background: ${props => (!props.open ? "rgba(14, 13, 13, 0.17)" : "transparent")};

  transition: all 0.2s ease;
`;

const Dropdown = styled.div`
  border-top: 1px solid rgba(255,255,255,0.2);
`;

const ArrowIcon = styled(KeyboardArrowDownIcon)`
  transition: transform 0.25s ease;
  transform: rotate(${props => (props.$open ? "180deg" : "0deg")});
`;

export default function ClientSearch(){
    const navigate=useNavigate()
    const { clientSlug, clientId } = useParams();

    const [open, setOpen] = useState(false)

  const {
    data: clients =[],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['active-clients'],
    queryFn: getActiveClients,
  });
  
    return(
        <ClientBox>
            <ClientHeader open={open} onClick={() => setOpen(!open)}>
                <Box>
                    <Box>
                    <Typography fontWeight={300} fontSize="0.8rem">Client</Typography>
                    <Typography fontWeight={800} fontSize="1rem">
                        {clientSlug || 'Select Client'}
                    </Typography>
                    </Box>
                </Box>
                <ArrowIcon $open={open} />
            </ClientHeader>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <Dropdown>
            <Box>
                {clients&&clients.map((c) => (
                <MenuItem
                    key={c.id}
                    onClick={() => { console.log('click')
                    navigate(`/${slugify(c.name)}/${c.id}/overview`);
                    setOpen(false);
                    }}
                >
                    <Typography fontSize="0.9rem">{c.name}</Typography>
                </MenuItem>
                ))}
            </Box>
    </Dropdown>
    </Collapse>
    </ClientBox>
    )}

