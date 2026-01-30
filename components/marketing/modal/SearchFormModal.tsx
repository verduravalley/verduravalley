import { toggleSearchModalClose } from "@/store/features/searchModalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import SearchForm from "../form/SearchForm";

const SearchFormModal = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(
    (state) => state.searchModal.isSearchModalOpen
  );
  const closeModal = () => {
    dispatch(toggleSearchModalClose());
  };
  return (
    <div className={`rv-search-modal ${showModal ? "active" : ""}`}>
      <SearchForm />
      <button className="rv-search-modal-close-btn" onClick={closeModal}>
        <i className="fa-regular fa-xmark"></i>
      </button>
    </div>
  );
};

export default SearchFormModal;
