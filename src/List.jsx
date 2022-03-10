import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function List() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState("");
  ////pagination////////////
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  /////////////////////////////

  const getData = async () => {
    let data = await axios(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setList(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (value) => {
    setList(
      list.filter((e) => {
        if (e.id !== value) return e;
      })
    );
  };
  const handleInput = (e) => {
    setForm(e.target.value);
  };
  console.log(list);
  return (
    <Wrapper>
      <Nav>
        <input
          placeholder="search by name,email or role"
          onChange={handleInput}
        />
      </Nav>
      <Lists>
        <table style={{ width: "1000px", textAlign: "left" }}>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </table>
      </Lists>

      {list
        .filter((e) => {
          if (form == "") return e;
          else if (
            e.name.toLowerCase().includes(form.toLowerCase()) ||
            e.role.toLowerCase().includes(form.toLowerCase()) ||
            e.email.toLowerCase().includes(form.toLowerCase())
          ) {
            return e;
          }
        })
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((e) => (
          <Lists>
            <table style={{ width: "1000px", textAlign: "left" }}>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            </table>
          </Lists>
        ))}
      {/* pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  border: 1px solid;
  padding: 20px;
`;
const Lists = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 1000px;
  td {
    width: 200px;
    padding: 8px;
  }
  th {
    width: 200px;
    padding: 8px;
  }
`;
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: space-around;
  input {
    width: 1000px;
  }
`;
