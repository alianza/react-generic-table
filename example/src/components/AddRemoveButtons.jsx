import utilStyles from "../utils.module.scss";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import * as PropTypes from "prop-types";

export default function AddRemoveButtons({ onRemove, onAdd, onChange, value }) {
  return (
    <div className="my-2 flex gap-4 text-neutral-50">
      <button
        className={`flex items-center gap-2 rounded bg-red-500 p-1 shadow ${utilStyles.hoverEffect}`}
        onClick={onRemove}
      >
        <span className="flex items-center">
          Remove item <MinusIcon className="w-5" />
        </span>
      </button>

      <span className="flex shadow">
        <input
          className="w-24 rounded-l p-1 text-neutral-900"
          name="name"
          placeholder="Name"
          onChange={onChange}
          value={value}
        />
        <button
          className={`flex origin-left items-center gap-2 rounded-r bg-green-500 p-1 ${utilStyles.hoverEffect}`}
          onClick={onAdd}
        >
          <span className="flex items-center">
            Add item <PlusIcon className="w-5" />
          </span>
        </button>
      </span>
    </div>
  );
}
