import { NextRequest, NextResponse } from "next/server";

import { supabase } from "src/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const strategyId = searchParams.get("strategyId");

    let query = supabase
      .from("freq_strategies")
      .select(`*, freq_strategy_parameters (*)`);

    if (strategyId) {
      query = query.eq("id", strategyId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch frequency strategy data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, timeFrame, parameters } = await req.json();
    if (!name || !timeFrame) {
      return NextResponse.json(
        { error: "Strategy name and time frame are required" },
        { status: 400 }
      );
    }
    const { data: strategyData, error: strategyError } = await supabase
      .from("freq_strategies")
      .insert({ name, description, time_frame: timeFrame })
      .select()
      .single();

    if (strategyError) {
      return NextResponse.json(
        { error: strategyError.message },
        { status: 500 }
      );
    }

    if (parameters && strategyData) {
      const parameterInserts = parameters.map((param: any) => ({
        strategy_id: strategyData.id,
        parameter_name: param.name,
        parameter_value: param.value,
      }));
      const { error: paramError } = await supabase
        .from("freq_strategy_parameters")
        .insert(parameterInserts);

      if (paramError) {
        console.log(
          "Error inserting freqency strategy parameters:",
          paramError
        );
      }

      return NextResponse.json(strategyData, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create frequency strategy" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, timeFrame, parameters } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Strategy ID is required" },
        { status: 400 }
      );
    }
    const { data: strategyData, error: strategyError } = await supabase
      .from("freq_strategies")
      .update({ name, description, time_frame: timeFrame })
      .eq("id", id)
      .select()
      .single();
    if (strategyError) {
      return NextResponse.json(
        { error: strategyError.message },
        { status: 500 }
      );
    }

    if (parameters) {
      await supabase
        .from("freq_strategy_parameters")
        .delete()
        .eq("strategy_id", id);

      const parameterInserts = parameters.map((param: any) => ({
        strategy_id: id,
        parameter_name: param.name,
        parameter_value: param.value,
      }));

      const { error: paramError } = await supabase
        .from("freq_strategy_parameters")
        .insert(parameterInserts);

      if (paramError) {
        console.log(
          "Error updating frequency strategy parameters:",
          paramError
        );
      }
    }

    return NextResponse.json(strategyData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create frequency strategy" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const strategyId = searchParams.get("strategyId");

    if (!strategyId) {
      return NextResponse.json(
        { error: "Strategy ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("freq_strategies")
      .delete()
      .eq("id", strategyId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Frequeycy strategy deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete frequency strategy" },
      { status: 500 }
    );
  }
}
