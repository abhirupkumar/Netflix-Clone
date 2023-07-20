import { Plan } from '@/typings'
import { AiOutlineCheck } from 'react-icons/ai'

interface Props {
    plans: Plan[]
    selectedPlan: Plan | null
}

function Table({ plans, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              INR {item.amount}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.resolution}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Availability
          </td>
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.description}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table