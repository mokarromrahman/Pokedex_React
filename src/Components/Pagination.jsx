import React, { useState, useEffect, useReducer } from "react";
import { Row, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

export default function Pagination({ originalPage, nextPage, previousPage }) {
  return (
    <Row className="justify-content-md-center">
      <Button onClick={previousPage ? previousPage : originalPage}>
        <ArrowLeft></ArrowLeft>
      </Button>
      <Button onClick={nextPage ? nextPage : originalPage}>
        <ArrowRight></ArrowRight>
      </Button>
    </Row>
  );
}
